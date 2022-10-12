const { check } = require("express-validator");

exports.linkCreateValidator = [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("url").not().isEmpty().withMessage("Url is required"),
    check("categories").not().isEmpty().withMessage("Please pick a category"),
    check("type").not().isEmpty().withMessage("Please pick a type"),
    check("medium").not().isEmpty().withMessage("Please pick a medium"),
];

exports.linkUpdateValidator = [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("url").not().isEmpty().withMessage("Url is required"),
    check("categories").not().isEmpty().withMessage("Please pick a category"),
    check("type").not().isEmpty().withMessage("Please pick a type"),
    check("medium").not().isEmpty().withMessage("Please pick a medium"),
];