const { ApolloServer, gql } = require("apollo-server")

// GraphQLスキーマを定義する
// スキーマとはデータ構造のこと
const typeDefs = gql`
    type Query {
        info: String!
    }
`

