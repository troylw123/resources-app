const express = require("express");
const router = express.Router();
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

// import from controllers
const {
  register,
  registerActivate,
  login,
  requireSignIn,
} = require("../controllers/auth");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);
router.get("/secret", requireSignIn, (req, res) => {
  res.json({
    data: "this is secret paged for logged in users only",
  });
});

module.exports = router;
