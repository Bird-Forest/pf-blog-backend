const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validateMongoose } = require("../middlewares");
// const { validateMongoose } = require("../middlewares/index");

const tagsList = ["animals", "hobby", "children", "health"];

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      enum: tagsList,
    },
    imageUrl: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      requied: true,
    },
  },
  { versionKey: false, timestamps: true }
);
// !!! ref - "user" - це посилання на колекцію, з якої буде { _id: owner}
postSchema.post("save", validateMongoose);

const addSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  tag: Joi.string()
    .valid(...tagsList)
    .required(),
  imageUrl: Joi.string(),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  text: Joi.string(),
  imageUrl: Joi.string(),
  tag: Joi.string().valid(...tagsList),
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
