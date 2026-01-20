const express = require("express");

const router = express.Router();
const baseURL = "/api/v1";

const userRouter = require("./api/userRoutes");
const postRouter = require("./api/postRoutes");

router.use(`${baseURL}/users`, userRouter);
router.use(`${baseURL}/posts`, postRouter);
module.exports = router;
