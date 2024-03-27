const HttpError = require("./HttpError");

const validateBody = (schemas) => {
  const func = (req, res, next) => {
    const { error } = schemas.validate(req.body);
    if (error) {
      console.log("HttpError!!!!!!!!!!", error.message);
      next(HttpError(400, error.message, "validateBody"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
