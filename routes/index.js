const express = require("express");

const router = express.Router();

const userRouter = require("./userRouter");
const lectureRouter = require("./lectureRouter");
const productRouter = require("./productRouter");

router.use("/users", userRouter);
router.use("/lecture", lectureRouter);
router.use("/products", productRouter);

module.exports = router;
