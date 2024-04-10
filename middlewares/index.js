const validateMongoose = require("./validateMongoose");
const ctrlWrapper = require("./ctrlWrapper");
const uploadImg = require("./uploadImg");
const HttpError = require("./HttpError");
const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
// const authenticate = require("./authenticate");

module.exports = {
  validateMongoose,
  ctrlWrapper,
  uploadImg,
  HttpError,
  validateBody,
  isValidId,
  // authenticate,
};
