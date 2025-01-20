const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ユーザーの新規登録のリゾルバー
async function signup(parent, args, context) {
  // passwordの設定
  const password = await bcrypt.hash(args.password, 10);

  // ユーザーの新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

// ユーザーのログインのリゾルバー
async function login(parent, args, context) {
  // ユーザーの取得
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  // パスワードの照合
  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("パスワードが違います");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

// newsを投稿するリゾルバー
async function post(parent, args, context) {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  return newLink;
}

module.exports = {
    signup,
    login,
    post
}