import express from "express";
import { ApolloServer, Config } from "apollo-server";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { typeDefs, resolvers } from "./schema";

const config = {
  typeDefs,
  resolvers,
  cacheControl: true,
  tracing: true,
  introspection: true,
  playground: true,
};

const server = new ApolloServer(config);

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 app running at ${url}`);
});

export default server;
