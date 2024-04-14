const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();
// const { validateBody, authenticate } = require("../../middlewares/index");
// const { schemas } = require("../../models/user");
// const ctrl = require("../../controllers/authUser");
const ctrl = require("../../controllers/ctrlUsers");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);
router.post("/signin", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/:id", authenticate, ctrl.getUser);
router.patch(
  "/:id/likes",
  isValidId,
  validateBody(schemas.likeShema),
  ctrl.updateLikes
);

module.exports = router;
