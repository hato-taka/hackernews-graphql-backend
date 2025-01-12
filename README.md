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
