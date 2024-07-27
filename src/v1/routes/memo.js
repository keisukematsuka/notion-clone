const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしてるユーザーが投稿したメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// ログインしてるユーザーが投稿したメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// ログインしてるユーザーが投稿したメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// ログインしてるユーザーが投稿したメモを1つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;
