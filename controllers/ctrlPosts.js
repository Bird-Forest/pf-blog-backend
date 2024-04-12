const { ctrlWrapper, HttpError } = require("../middlewares");
const { Post } = require("../models/post");
// ***
const getAllPosts = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  const result = await Post.find().populate("owner", "name avatar likes");
  res.json(result);
};
// ***
const getUserPosts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Post.find({ owner });
  res.json(result);
};
// ***
const getPostById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Post.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
// ***
const addPost = async (req, res) => {
  // const post = req.body;

  // console.log("ADD POST", req.body);
  // const { post } = req.body;
  const { _id: owner } = req.user;
  console.log(owner);
  const result = await Post.create({ ...req.body, owner });
  console.log(result);
  // const result = await Post.create({ ...req.body });
  // const result = await Post.create(req.body);
  // console.log(result);
  res.status(201).json(result);
};
// ***
const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log("deletePost", id);
  const result = await Post.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // console.log(result);
  res.status(204).json({
    message: "Delete success",
  });
};
// ***
const updatePost = async (req, res) => {
  const { id } = req.params;
  const result = await Post.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json({ message: "Success" });
  // res.status(201).json(result);
};

module.exports = {
  getAllPosts: ctrlWrapper(getAllPosts),
  getUserPosts: ctrlWrapper(getUserPosts),
  addPost: ctrlWrapper(addPost),
  getPostById: ctrlWrapper(getPostById),
  deletePost: ctrlWrapper(deletePost),
  updatePost: ctrlWrapper(updatePost),
};
