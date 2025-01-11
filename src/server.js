const { ApolloServer, gql } = require("apollo-server")

// HackerNewsの投稿
let links = [
    {
        id: "link-0",
        description: "テストの投稿です",
        url: ".com"
    }
]

// GraphQLスキーマを定義する
// スキーマとはデータ構造のこと
const typeDefs = gql`
    type Query {
        info: String!
        feed: [Link]!
    }
    
    type Link {
        id: ID!
        description: String!
        url: String!
    }
`
// リゾルバ関数
// 定義した値に対して何かしらの実際な値を入れること
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
        feed: () => links,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => console.log(`${url}でサーバーが起動中です`))