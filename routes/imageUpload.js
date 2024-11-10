const express = require("express");
const router = express.Router();

const { imageUpload } = require("../controller/imageUpload");

router.post("/imageUpload", imageUpload);

module.exports = router;
