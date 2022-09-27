const { check } = require("express-validator");

exports.categoryCreateValidator = [
  check("name").not().isEmpty().withMessage("Category name is required"),
  // check("image").not().isEmpty().withMessage("Image required"),
  check("content").isLength({ min: 20 }).withMessage("Description is required"),
];

exports.categoryUpdateValidator = [
  check("name").not().isEmpty().withMessage("Category name is required"),
  check("content").isLength({ min: 20 }).withMessage("Description is required"),
];
