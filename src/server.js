const { ApolloServer, gql } = require("apollo-server")
const fs = require("fs")
const path = require("path")

const { PrismaClient } = require("@prisma/client")
const { url } = require("inspector")

// リゾルバ関数
// 定義した値に対して何かしらの実際な値を入れること
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
        feed: async(parent, args, context) => {
            return context.prisma.link.findMany()
        },
    },

    Mutation: {
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            })
            return newLink
        }
    }
}

// contextは「どこでも使える」という意味
const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
    context: {
        prisma: new PrismaClient()
    }
});

server.listen().then(({url}) => console.log(`${url}でサーバーが起動中です`))