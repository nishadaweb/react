const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add first name"],
      trim: true,
      text: true,
    },
    lastname: {
      type: String,
      required: [true, "Please addlast name"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    picture: {
      type: String,
      default: "frontendpublicimagesdefault_profile.png",
    },
    cover: {
      type: String,
      default: "frontendpublicimagesdefault_profile.png",
    },
    gender: {
      type: String,
      required: [true, "Please add a gender"],
    },
    birthyear: {
      type: Number,
      required: [true, "Please add a year"],
    },
    birthmonth: {
      type: Number,
      required: [true, "Please add a month"],
    },
    birthday: {
      type: Number,
      required: [true, "Please add a day"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    requests: {
      type: String,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    defaults: {
      bio: {
        type: String,
      },
      hometown: {
        type: String,
      },
      currentcity: {
        type: String,
      },
      job: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
