const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../../controllers/authController");
const { validate } = require("../../middlewares/validate");
const { auth: authSchema } = require("../../schemas");

router.post("/signin", validate(authSchema.signIn), signIn);
router.post("/signup", validate(authSchema.signUp), signUp);
module.exports = router;
