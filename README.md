# udemyの講座
https://wakutojp.udemy.com/course/graphql-tutorial-with-newsapp-api/learn/lecture/

# install

`npm install apollo-server@^2 graphql@^14.6.0`

# Apollo server の使い方
https://www.apollographql.com/docs/

# 手順
1. typeDefs で型を定義する
2. resolvers で型に合わせた、実データを返却する

### readFileSync
`fs.readFileSync(path[, options]);`

# Prisma
マイグレーション: datasource と model をもとにDBを作成すること(SQL文を作成すること)
`npx prisma migrate dev` 

公式ドキュメント: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client

## `findMany`
https://www.prisma.io/docs/orm/prisma-client/queries/crud#get-all-records

```js
const users = await prisma.user.findMany()
```
SQL の SELECT 文に相当

## `context`
resolver ないで使える変数を登録する

1. `npx prisma migrate [名前]`
  データベースのモデルの更新
2. `npx prisma generate`

スキーマを作成した際は、必ずresolver を設定しないといけない

# import と require
## import
使用環境: ES6 (ECMAScript 2015)以降のモジュールシステム。
## require
使用環境: Node.js（CommonJS）で採用されているモジュールシステム。

<details>

<summary>GPTの解説</summary>

### **1. `import`**
- **使用環境:** ES6 (ECMAScript 2015)以降のモジュールシステム。
- **特徴:**
  - 静的インポート（Static Import）。
  - モジュールのインポートはファイルの先頭で行われる必要があります。
  - インポート時に依存関係が解析されるため、構文チェックが事前に行われます。
  - **非同期処理ではなく、同期的に実行されます。**
  - モダンブラウザやTypeScript、Babelなどのトランスパイラで広くサポートされています。


### **2. `require`**
- **使用環境:** Node.js（CommonJS）で採用されているモジュールシステム。
- **特徴:**
  - 動的インポートが可能（プログラムの任意の箇所でモジュールを読み込むことができる）。
  - 実行時にモジュールが読み込まれるため、依存関係が動的に解決されます。
  - **非同期処理に対応していない**。
  - CommonJSに依存しているため、主にNode.jsの環境で利用されます（ただし、Node.jsの新しいバージョンでは`import`もサポート）。

### **主な違いまとめ**

| 特徴                      | `import`                  | `require`               |
|---------------------------|---------------------------|-------------------------|
| **モジュールシステム**    | ES6 Modules               | CommonJS                |
| **動的インポート**        | 不可（`import()`関数を使用すれば可能） | 可能                    |
| **静的/動的**             | 静的インポート            | 動的インポート          |
| **使用環境**              | モダンブラウザ、Node.js   | 主にNode.js             |
| **非同期性**              | 非対応（基本的に同期）    | 非対応（同期）          |
| **サポート状況**          | モダンな環境で推奨        | レガシー環境で主流       |

---

### **実際の使用例**
- **Node.jsの新しいプロジェクト**では、可能であれば`import`を推奨。
- **既存のNode.jsプロジェクト**やレガシーコードでは、互換性のため`require`を使用することが一般的です。

Node.jsで`import`を使用する場合、`package.json`に以下を追加する必要があります：
```json
"type": "module"
```

</details>


### module.exports と exports の違い
`module.exports`:

モジュールがエクスポートするオブジェクトそのもの。
モジュールでエクスポートされる唯一の値を定義します。

`exports`:

module.exports のショートカット（初期値として module.exports を指しています）。
プロパティを追加することで、module.exports に機能を追加できます。

# 認証の実装

JWTの使用 
`npm install jsonwebtoken`


## `findUnique`

<details>

<summary>GPTの回答</summary>

Prisma の **`findUnique`** は、データベースから特定の条件に一致する **1件のレコード** を取得するためのクエリメソッドです。主に **ユニークなフィールド（主キーやユニークキー）** を利用して検索を行います。

---

## **1. 基本的な使い方**
`findUnique` を使用する際は、`where` オプションを指定し、検索条件を提供します。

### **基本構文**
```typescript
prisma.modelName.findUnique({
  where: { uniqueField: value },
});
```

- **`modelName`**: Prisma Schema に定義されているモデル名（例: `User`, `Post`）。
- **`where`**: 検索条件。必ずユニークなフィールド（`@id` や `@unique` が付いたフィールド）を指定する必要があります。

---

## **2. 使用例**

### **例 1: 主キーで検索**
#### **Prisma Schema**
```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
}
```

#### **クエリ**
主キー（`id`）で特定のユーザーを検索します。
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
});
console.log(user);
```

---

### **例 2: ユニークキーで検索**
#### **クエリ**
ユニークキー（`email`）で検索します。
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
});
console.log(user);
```

---

## **3. レコードが見つからない場合の動作**
- デフォルトでは、条件に一致するレコードが存在しない場合、**`null`** を返します。

#### **例**
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'notfound@example.com' },
});
console.log(user); // 出力: null
```

---

## **4. `findUniqueOrThrow` を利用する**
Prisma 2.23.0 以降では、`findUniqueOrThrow` メソッドが提供されています。  
これを使うと、条件に一致するレコードが存在しない場合にエラーをスローします。

#### **例**
```typescript
try {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: 'notfound@example.com' },
  });
  console.log(user);
} catch (error) {
  console.error('User not found:', error);
}
```

---

## **5. `select` オプションで必要なフィールドのみ取得**
`select` オプションを利用して、必要なフィールドだけを取得することで、データ量を最適化できます。

#### **例**
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
  select: {
    name: true,
  },
});
console.log(user); // 出力: { name: 'Alice' }
```

---

## **6. リレーションデータの取得（`include`）**
`include` オプションを使うと、リレーション（関連データ）を同時に取得できます。

#### **Prisma Schema**
```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id      Int    @id @default(autoincrement())
  title   String
  userId  Int
  user    User   @relation(fields: [userId], references: [id])
}
```

#### **クエリ**
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true, // ユーザーに関連付けられた投稿を取得
  },
});
console.log(user);
```

**出力例:**
```json
{
  "id": 1,
  "name": "Alice",
  "posts": [
    { "id": 1, "title": "First Post" },
    { "id": 2, "title": "Second Post" }
  ]
}
```

---

## **7. `findUnique` と `findFirst` の違い**
- **`findUnique`**:
  - ユニークなフィールド（`@id` や `@unique`）に基づいて検索。
  - 一致するレコードは必ず1件のみ。
  - 条件に一致しない場合、`null` を返す。

- **`findFirst`**:
  - 任意の条件で最初に一致したレコードを取得。
  - 一意性を保証しない。
  - 条件に一致しない場合、`null` を返す。

#### **`findFirst` の例**
```typescript
const user = await prisma.user.findFirst({
  where: { name: 'Alice' },
});
console.log(user);
```

---

## **8. 注意点**
1. **ユニークフィールドの制約**:
   - `findUnique` の検索条件は必ずユニークなフィールド（`@id` または `@unique`）で指定する必要があります。
   - 非ユニークフィールドを指定するとエラーが発生します。

2. **大規模データではパフォーマンスを考慮**:
   - 必要最小限のフィールドだけを取得するよう、`select` を活用。

---

`findUnique` は、ユニークフィールドを利用したデータ検索に特化したメソッドで、シンプルかつ効率的に1件のレコードを取得できます。シーンに応じて `findFirst` や `findUniqueOrThrow` と使い分けることで、より柔軟にデータ操作を行えます。

</details>