import { gql } from "apollo-server";
import getCommits from "./resolvers/commits";
import getTweets from "./resolvers/tweets";
// import getAlbum, { AlbumInfo } from './resolvers/album'
import getBooks from "./resolvers/books";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Album {
    name: String
    artist: String
  }
  type Book {
    name: String
    author: String
  }
  type Query {
    commits: Int @cacheControl(maxAge: 3600)
    tweets: Int @cacheControl(maxAge: 3600)
    places: Int @cacheControl(maxAge: 86400)
    steps: Int @cacheControl(maxAge: 3600)
    songs: Int @cacheControl(maxAge: 3600)
    album: Album @cacheControl(maxAge: 3600)
    books: [Book] @cacheControl(maxAge: 86400)
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
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
      } catch (error) {
        return error;
      }
    },
    songs: async () => {
      try {
      } catch (error) {
        return error;
      }
    },
  },
};

export { typeDefs, resolvers };
