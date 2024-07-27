const JWT = require("jsonwebtoken");
const User = require("../models/user");

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  const bearerHeder = req.headers["authorization"];
  //   console.log(bearerHeder);
  if (bearerHeder) {
    const bearer = bearerHeder.split(" ")[1];
    try {
      const decodeToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodeToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

// JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // JWTと一致するユーザーを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("その権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
