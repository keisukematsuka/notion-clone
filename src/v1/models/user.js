const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 第一引数はモンゴDBのコレクション名
module.exports = mongoose.model("User", userSchema);
