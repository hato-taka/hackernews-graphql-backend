const { ApolloServer, gql } = require("apollo-server")

// GraphQLスキーマを定義する
// スキーマとはデータ構造のこと
const typeDefs = gql`
    type Query {
        info: String!
    }
`
// リゾルバ関数
// 定義した値に対して何かしらの実際な値を入れること
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => console.log(`${url}でサーバーが起動中です`))