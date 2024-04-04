const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/ctrlPosts");
const { uploadImg, isValidId, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/post");

router.get("/", ctrl.getAllPosts);
router.get("/:id", isValidId, ctrl.getPostById);
router.post("/", validateBody(schemas.addSchema), ctrl.addPost);
router.delete("/:id", isValidId, ctrl.deletePost);
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updatePost
);
router.patch(
  "/:id/counter",
  isValidId,
  validateBody(schemas.likeShema),
  ctrl.updateLikes
);

// ****** UPLOAD FILE
router.post("/upload", uploadImg.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

module.exports = router;
