const jwt = require("jsonwebtoken");
// const { HttpError } = require("./index");
// const { User } = require("../models/user");
const HttpError = require("./HttpError");
const { User } = require("../models/user");
const { SEKRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  console.log("authorization", req.headers);

  const [bearer, token] = authorization.split(" ");
  console.log(token);
  console.log(bearer);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized, authenticate 1"));
  }
  try {
    const { id } = jwt.verify(token, SEKRET_KEY);
    console.log(id);

    const user = await User.findById(id);
    console.log("USER", user);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized, authenticate 2"));
    }
    // ** Додаємо в тіло запиту об'єкт користувача і надалі використовуємо в контроллерах **
    // !!! обов'язково
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
