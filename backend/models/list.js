const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: { type: Array },
  },
  { timestamps: true }
);
const List = new mongoose.model("ListModel", listSchema);

module.exports = List;
