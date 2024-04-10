// const { token } = require("morgan");
const { ctrlWrapper, HttpError } = require("../middlewares");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SEKRET_KEY } = process.env;
// const { User } = require("../models/user.");

// const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    name,
    email,
    password: hashPassword,
  });
  // console.log("NewUser", newUser._id);
  const token = jwt.sign({ id: newUser._id }, SEKRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    viewsCount: newUser.viewsCount,
    avatar: newUser.avatar,
    token: newUser.token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN", req.body);
  const user = await User.findOne({ email });
  console.log("USER", user);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // const passwordCompare = await bcrypt.compare(password, user.password);
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: user._id }, SEKRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.name,
    viewsCount: user.viewsCount,
    avatar: user.avatar,
    token: user.token,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  console.log("ID", id);
  const result = await User.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const user = {
    id: result._id,
    name: result.name,
    email: result.email,
    avatar: result.avatar,
    viewsCount: result.viewsCount,
    token: result.token,
  };

  res.json(user);
};

const updateLikes = async (req, res) => {
  const { id } = req.params;
  console.log("COUNT", req.body);
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // console.log("RESULT", result);
  res.status(201).json({ message: "Success" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getUser: ctrlWrapper(getUser),
  updateLikes: ctrlWrapper(updateLikes),
};
