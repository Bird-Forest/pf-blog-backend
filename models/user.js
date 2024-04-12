const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validateMongoose } = require("../middlewares");
// const { validateMongoose } = require("../middlewares/index");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/01/31/23/08/boy-2028012_640.png",
    },
    likes: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      default: " ",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", validateMongoose);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const likeShema = Joi.object({
  likes: Joi.number(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  likeShema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
