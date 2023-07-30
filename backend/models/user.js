const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      trime: true,
      minlength: 6,
    },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { collection: 'users' },
  { timestamps: true }
);
const User = new mongoose.model("UserModel", userSchema);

module.exports = User;
