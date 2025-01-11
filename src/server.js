const { ApolloServer, gql } = require("apollo-server")
const fs = require("fs")
const path = require("path")

// HackerNewsの投稿
let links = [
    {
        id: "link-0",
        description: "テストの投稿です",
        url: ".com"
    }
]

// リゾルバ関数
// 定義した値に対して何かしらの実際な値を入れること
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
        feed: () => links,
    },

    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url

            }

            links.push(link);
            return link;
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers
});

server.listen().then(({url}) => console.log(`${url}でサーバーが起動中です`))