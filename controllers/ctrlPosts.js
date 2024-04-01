const { ctrlWrapper, HttpError } = require("../middlewares");
const { Post } = require("../models/post");

const getAllPosts = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  const result = await Post.find();
  // console.log("ALL", result);
  res.json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await Post.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // console.log("getPostById", result);
  res.json(result);
};

const addPost = async (req, res) => {
  // console.log("ADD POST", req.body);
  // const { _id: owner } = req.user;
  // const result = await Post.create({ ...req.body, owner });
  // const result = await Post.create({ ...req.body });
  const result = await Post.create(req.body);
  // console.log(result);
  res.status(201).json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await Post.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // console.log(result);
  res.status(204).json({
    message: "Delete success",
  });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  // console.log("updatePost ID", id);

  // const { imageUrl, tag, title, text } = req.body;
  // console.log("updatePost POST", req.body);
  const result = await Post.findByIdAndUpdate(
    id,
    req.body,
    // { imageUrl, tag, title, text },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }

  // console.log("RESULT", result);
  res.status(201).json({ message: "Success" });
  // res.status(201).json(result);
};

module.exports = {
  getAllPosts: ctrlWrapper(getAllPosts),
  addPost: ctrlWrapper(addPost),
  getPostById: ctrlWrapper(getPostById),
  deletePost: ctrlWrapper(deletePost),
  updatePost: ctrlWrapper(updatePost),
};
