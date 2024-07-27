const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  // ユーザーデータベースとの紐づけ
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "ここに自由記載してください",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

// 第一引数はモンゴDBのコレクション名
module.exports = mongoose.model("Memo", memoSchema);
