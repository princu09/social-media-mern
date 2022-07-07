const express = require("express");
const { uploadPost, allPost } = require("../controllers/post");
const router = express.Router();
const { body } = require("express-validator");

router.post("/uploadPost", uploadPost);

router.get("/allPost", allPost);

module.exports = router;
