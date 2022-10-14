const Link = require('../models/link');
const slugify = require('slugify');
const Category = require('../models/category');

exports.create = (req, res) => {
    const { title, url, categories, type, medium } = req.body
    const slug = url
    let link = new Link({ title, url, categories, type, medium, slug })
    link.postedBy = req.auth._id
    link.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: 'Link already exists'
            })
        }
        res.json(data);
    })
};

exports.list = (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Link.find({})
        .populate('postedBy', 'name')
        .populate('categories', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: 'Links failed to load'
                })
            }
            res.json(data);
        })
};

exports.clickCount = (req, res) => {
    const { linkId } = req.body
    Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } }, { upsert: true, new: true },).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'Could not update click count'
            })
        }
        res.json(result)
    })

}

exports.read = (req, res) => {
    const { id } = req.params
    Link.findOne({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Could not find link'
            })
        }
        res.json(data)
    })
};

exports.update = (req, res) => {
    const { id } = req.params
    const { title, url, categories, type, medium } = req.body
    const updatedLink = { title, url, categories, type, medium }
    Link.findOneAndUpdate({ _id: id }, updatedLink, { new: true }).exec((err, updated) => {
        if (err) {
            return res.status(400).json({
                error: 'Error updating link'
            })
        }
        res.json(updated)
    })
};

exports.remove = (req, res) => {
    console.log(req.params)
    const { id } = req.params
    Link.findOneAndRemove({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Error removing link from database'
            })
        }
        res.json({
            message: 'Link removed successfully'
        })
    })
};

exports.popular = (req, res) => {
    Link.find()
        .populate('postedBy', 'name')
        .sort({ clicks: -1 })
        .limit(3)
        .exec((err, links) => {
            if (err) {
                return res.status(400).json({
                    error: 'Could not load popular links'
                })
            }
            res.json(links)
        })
};

exports.popularInCategory = (req, res) => {
    const { slug } = req.params
    Category.findOne({ slug })
        .exec((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: 'Could not find category'
                })
            }
            Link.find({ categories: category })
                .sort({ clicks: -1 })
                .limit(3)
                .exec((err, links) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Links not found'
                        })
                    }
                    res.json(links)
                })
        })
};