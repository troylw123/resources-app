const express = require('express');
const router = express.Router();

const {
  categoryCreateValidator,
  categoryUpdateValidator,
} = require('../validators/category');
const { runValidation } = require('../validators');
const {
  requireSignIn,
  adminMiddleware,
  authMiddleware,
} = require('../controllers/auth');
const { create, list, read, update, remove } = require("../controllers/category");

router.post("/category", categoryCreateValidator, requireSignIn, adminMiddleware, create);
router.get("/categories", list);
router.post("/category/:slug", read);
router.put("/category/:slug", requireSignIn, categoryUpdateValidator, runValidation, adminMiddleware, update);
router.delete("/category/:slug", requireSignIn, adminMiddleware, remove);

module.exports = router;