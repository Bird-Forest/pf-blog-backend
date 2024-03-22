const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validateMongoose } = require("../middlewares/index");

const tagsList = ["animals", "recipes", "children", "health"];

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: String,
      required: true,
      enum: tagsList,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
  },
  { versionKey: false, timestamps: true }
);
// !!! ref - "user" - це посилання на колекцію, з якої буде { _id: owner}
postSchema.post("save", validateMongoose);

const addSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  tegs: Joi.string()
    .valid(...tagsList)
    .required(),
  imageUrl: Joi.string(),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  text: Joi.string(),
  imageUrl: Joi.string(),
  viewsCount: Joi.number(),
  tags: Joi.string()
    .valid(...tagsList)
    .required(),
});

const schemas = {
  addSchema,
  updateSchema,
};

const Post = model("post", postSchema);

module.exports = {
  Post,
  schemas,
};
