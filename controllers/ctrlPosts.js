const { ctrlWrapper } = require("../middlewares");
const { Post } = require("../models/post");

const getAllPosts = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  const result = await Post.find();
  console.log("ALL", result);
  res.json(result);
};

const addPost = async (req, res) => {
  console.log("ADD POST", req.body);
  // const { _id: owner } = req.user;
  // const result = await Post.create({ ...req.body, owner });
  // const result = await Post.create({ ...req.body });
  const result = await Post.create(req.body);
  console.log(result);
  res.status(201).json(result);
};

module.exports = {
  getAllPosts: ctrlWrapper(getAllPosts),
  addPost: ctrlWrapper(addPost),
};
