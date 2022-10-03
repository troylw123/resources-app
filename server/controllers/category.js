const Category = require('../models/category');
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
            return res.json(success)
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

};

exports.update = (req, res) => {

};

exports.remove = (req, res) => {

};