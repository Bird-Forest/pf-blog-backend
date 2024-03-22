const { ctrlWrapper } = require("../middlewares");
const { Post } = require("../models/post");

const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Post.find("-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

const addPost = async (req, res) => {
  // const { _id: owner } = req.user;
  // const result = await Post.create({ ...req.body, owner });
  const result = await Post.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = {
  getAllPosts: ctrlWrapper(getAllPosts),
  addPost: ctrlWrapper(addPost),
};
