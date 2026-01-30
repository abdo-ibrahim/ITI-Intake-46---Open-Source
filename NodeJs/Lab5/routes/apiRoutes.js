const express = require("express");

const router = express.Router();
const baseURL = "/api/v1";

const authRouter = require("./api/authRoutes");
const userRouter = require("./api/userRoutes");
const postRouter = require("./api/postRoutes");
const donationRouter = require("./api/donationRoutes");

router.use(`${baseURL}/auth`, authRouter);
router.use(`${baseURL}/users`, userRouter);
router.use(`${baseURL}/posts`, postRouter);
router.use(`${baseURL}/donation`, donationRouter);
module.exports = router;
