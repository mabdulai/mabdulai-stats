import {} from "dotenv/config";
import { ApolloServer } from "apollo-server";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { typeDefs, resolvers } from "./schema";
const defaultQuery = `{
  commits
  tweets
  games {
    owned_games
    recently_played
  }
  books {
    name
    author
  }
  music
}`;

const config = {
  typeDefs,
  resolvers,
  cacheControl: true,
  tracing: true,
  introspection: true,
  playground: true,
};

const server = new ApolloServer(config);

if (process.env.NODE_ENV === "production") {
  config.playground = {
    tabs: [
      {
        endpoint: "https://mabdulai-stats.vercel.app/graphql",
        query: defaultQuery,
      },
    ],
  };

  config.plugins = [responseCachePlugin()];
}

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 app running at ${url}`);
});

export default server;
