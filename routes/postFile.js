const express = require("express");
const router = express.Router();

const { postFile, getAllPosts } = require("../controller/postController");

router.post("/posts/create", postFile);
router.get("/posts", getAllPosts);

module.exports = router;
