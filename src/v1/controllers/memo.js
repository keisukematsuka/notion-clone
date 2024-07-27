const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().countDocuments();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(200).json(memo);
  } catch (err) {
    console.error("Error creating memo:", err); // エラーの詳細をコンソールに出力
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch (err) {
    console.error("Error creating memo:", err); // エラーの詳細をコンソールに出力
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { memoId } = req.params;
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description } = req.body; // req.body から title と description を取得
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入してください";
    const { memoId } = req.params;
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    // mongooseの更新
    const updatedMemo = await Memo.findByIdAndUpdate(
      memoId,
      {
        $set: req.body,
      },
      { new: true }
    ); // 更新後のドキュメントを返すオプション

    // updatedMemoは更新後のオブジェクト
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { memoId } = req.params;
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    // mongooseの1つを削除する関数
    await Memo.deleteOne({ _id: memoId });

    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};
