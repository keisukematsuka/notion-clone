const router = require("express").Router();

// エンドポイントのパス設定を追加
router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));

module.exports = router;
