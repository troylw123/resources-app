const Category = require('../models/category');
const Link = require('../models/link');
const slugify = require('slugify');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const fs = require('fs');

// s3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

exports.create = (req, res) => {
    const { name, image, content } = req.body
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    const type = image.split(';')[0].split('/')[1]

    const slug = slugify(name)
    let category = new Category({ name, content, slug })

    const params = {
        Bucket: 'troy-resources-app',
        Key: `category/${uuidv4()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: 'Upload to s3 failed'
            })
        }
        category.image.url = data.Location
        // category.image.key = data.Key (was creating duplicate images)
        category.postedBy = req.auth._id;

        category.save((err, success) => {
            if (err) res.status(400).json({ error: 'This category already exists.' })
            res.json(success)
        })
    })
};

exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories could not load'
            })
        }
        res.json(data);
    })
};

exports.read = (req, res) => {
    const { slug } = req.params

    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Category.findOne({ slug })
        .populate('postedBy', '_id name username')
        .exec((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: 'Could not load category'
                })
            }
            Link.find({ categories: category })
                .populate('postedBy', '_id name username')
                .populate('categories', 'name')
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .exec((err, links) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Could not load links for this category'
                        })
                    }
                    res.json({ category, links })
                })
        })
};

exports.update = (req, res) => {
    const { slug } = req.params
    const { name, image, content } = req.body

    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    const type = image.split(';')[0].split('/')[1]

    Category.findOneAndUpdate({ slug }, { name, content }, { new: true }).exec((err, updated) => {
        if (err) {
            return res.status(400).json({
                error: 'Could not find category to update'
            })
        }
        console.log("updated", updated)
        if (image) {
            //remove existing image from s3 before adding new one
            const key = updated.image.url.split('.com/')[1]
            const deleteParams = {
                Bucket: 'troy-resources-app',
                Key: key,
            };
            s3.deleteObject(deleteParams, function (err, data) {
                if (err) {
                    console.log('S3 Delete Error During Update', err)
                }
                else {
                    console.log('S3 deleted during update', data)
                }
            })

            const params = {
                Bucket: 'troy-resources-app',
                Key: `category/${uuidv4()}.${type}`,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}`
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: 'Upload to s3 failed'
                    })
                }
                updated.image.url = data.Location
                // category.image.key = data.Key (was creating duplicate images)
                updated.postedBy = req.auth._id;

                updated.save((err, success) => {
                    if (err) res.status(400).json({ error: 'This category already exists.' })
                    res.json(success)
                })
            })
        } else {
            res.json(updated)
        }

    })
};

exports.remove = (req, res) => {
    const { slug } = req.params

    Category.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: 'Could not find category to delete'
            })
        }

        const key = data.image.url.split('.com/')[1]
        const deleteParams = {
            Bucket: 'troy-resources-app',
            Key: key,
        };
        console.log('deleteParams', deleteParams)
        s3.deleteObject(deleteParams, function (err, data) {
            if (err) {
                console.log('S3 Delete Error', err)
            }
            else {
                console.log('S3 deleted successfully', data)
            }
        })
        res.json({
            message: 'Category deleted successfully'
        })
    })
};