const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const User = require("./src/v1/models/user");

const app = express();
const PORT = 5000;
require("dotenv").config();

app.use(
  cors({
    origin: "https://notion-clone-692f82db0b79.herokuapp.com",
  })
);
app.use(express.json());

// APIルートの設定
app.use("/api/v1", require("./src/v1/routes"));

// 静的ファイルを提供するための設定
app.use(express.static(path.join(__dirname, "public/build")));

// すべてのルートがヒットしなかった場合に、Reactのindex.htmlを返す
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/build", "index.html"));
});

// DB接続
try {
  mongoose.connect(
    "mongodb+srv://matsukakeisuke:missing0202@cluster0.eoo8jue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ||
      process.env.MONGODB_URI,
    {
      tlsAllowInvalidCertificates: true,
    }
  );
  console.log("DBと接続中");
} catch (error) {
  console.log(error);
  console.log("接続エラー");
}

// サーバーの起動
app.listen(process.env.PORT || PORT, () => {
  console.log("ローカルサーバー起動中");
});
