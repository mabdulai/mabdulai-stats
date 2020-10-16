import { gql } from "apollo-server";
import getCommits from "./resolvers/commits";
import getTweets from "./resolvers/tweets";
import getGames from "./resolvers/games";
import getBooks from "./resolvers/books";

const steam = require("steam-web");
// Setup the steam API wrapper
const apiKey = `${process.env.STEAM_KEY}`;
const s = new steam({
  apiKey,
  format: "json", //optional ['json', 'xml', 'vdf']
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    name: String
    author: String
  }

  type Game {
    owned_games: Int
    recently_played: String
  }

  type Query {
    commits: Int @cacheControl(maxAge: 3600)
    tweets: Int @cacheControl(maxAge: 3600)
    books: [Book] @cacheControl(maxAge: 86400)
    games: Game @cacheControl(maxAge: 3600)
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    games: async () => {
      try {
        const games = await getGames();
        return games;
      } catch (error) {
        console.error(error.message ? error.message : error);
        return null;
      }
    },
    books: async () => {
      try {
        const books = await getBooks();
        return books;
      } catch (error) {
        console.error(error.message ? error.message : error);
        return null;
      }
    },
    commits: async () => {
      try {
        const commits = await getCommits();
        return commits;
      } catch (error) {
        console.error(error.message ? error.message : error);
        return null;
      }
    },
    tweets: async () => {
      try {
        const tweets = await getTweets();
        return tweets;
      } catch (error) {
        console.error(error.message ? error.message : error);
        return null;
      }
    },
    books: async () => {
      try {
        const books = await getBooks();
        return books;
      } catch (error) {
        console.error(error.message ? error.message : error);
        return null;
      }
    },
  },
};

export { typeDefs, resolvers };
