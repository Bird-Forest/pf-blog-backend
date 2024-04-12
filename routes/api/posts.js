const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/ctrlPosts");
const { uploadImg, isValidId, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/post");
const authenticate = require("../../middlewares/authenticate");

router.get("/", ctrl.getAllPosts);
router.get("/user", authenticate, ctrl.getUserPosts);
router.get("/:id", authenticate, isValidId, ctrl.getPostById);
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addPost);
router.delete("/:id", authenticate, isValidId, ctrl.deletePost);
router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updatePost
);

// ****** UPLOAD FILE
router.post("/upload", uploadImg.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
//
module.exports = router;
