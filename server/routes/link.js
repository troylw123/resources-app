const express = require('express');
const router = express.Router();

const {
    linkCreateValidator,
    linkUpdateValidator,
} = require('../validators/link');
const { runValidation } = require('../validators');
const {
    requireSignIn,
    authMiddleware,
    adminMiddleware
} = require('../controllers/auth');
const { create, list, read, update, remove, clickCount, popular, popularInCategory } = require("../controllers/link");

router.post("/link", linkCreateValidator, runValidation, requireSignIn, authMiddleware, create);
router.post("/links", requireSignIn, adminMiddleware, list);
router.put("/click-count", clickCount);
router.get('/link/popular', popular);
router.get('/link/popular/:slug', popularInCategory);
router.get("/link/:id", read);
router.put("/link/:id", requireSignIn, linkUpdateValidator, runValidation, authMiddleware, update);
router.put("/link/admin/:id", requireSignIn, linkUpdateValidator, runValidation, adminMiddleware, update);
router.delete("/link/:id", requireSignIn, authMiddleware, remove);
router.delete("/link/admin/:id", requireSignIn, adminMiddleware, remove);

module.exports = router;