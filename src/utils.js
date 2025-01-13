const jwt = require("jsonwebtoken");

// トークンを複合するための関数
function getTokenPayLoad(token) {
  // トークン化された前の情報(user.id)を複合する
  return jwt.verify(token, process.env.APP_SECRET);
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーを確認する
    // 認証権限の確認する
    const authHeader = req.headers.authorization;
    // 権限があるなら
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("トークンが見つかりません");
      }
      // トークンが一致するか確認する(複合する)
      const { userId } = getTokenPayLoad(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayLoad(authToken);
    return userId;
  }

  throw new Error("認証権限がありません");
}

module.exports = {
  getUserId,
};
