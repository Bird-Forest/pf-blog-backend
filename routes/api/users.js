const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();
// const { validateBody, authenticate } = require("../../middlewares/index");
// const { schemas } = require("../../models/user");
// const ctrl = require("../../controllers/authUser");
const ctrl = require("../../controllers/ctrlUsers");

router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);
router.post("/signin", validateBody(schemas.loginSchema), ctrl.login);
router.get("/:id", ctrl.getUser);

router.patch(
  "/:id/counter",
  isValidId,
  validateBody(schemas.likeShema),
  ctrl.updateLikes
);

module.exports = router;
