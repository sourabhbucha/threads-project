import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Reaction {
    id: ID!
    type: String!
  }

  type ThreadReaction {
    id: ID!
    reaction: Reaction!
    user: User!
  }

  type Reply {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
    replies: [Reply!]!
  }

  type Thread {
    id: ID!
    title: String
    content: String!
    author: User!
    replies: [Reply!]!
    reactions: [ThreadReaction]
    createdAt: String!
  }

  type Query {
    threads(page: Int, limit: Int): ThreadPage!
    thread(id: ID!): Thread
  }

  type ThreadPage {
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    threads: [Thread!]!
  }
`;

export default typeDefs;
