const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/ctrlPosts");
const { uploadImg } = require("../../middlewares");

router.get("/", ctrl.getAllPosts);
router.post("/", ctrl.addPost);

// ****** UPLOAD FILE
router.post("/upload", uploadImg.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

module.exports = router;
