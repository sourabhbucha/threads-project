import { GraphQLResolveInfo } from "graphql";
import { Post, User, Reaction, ThreadReaction } from "../models";

export interface ThreadPage {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  threads: Post[];
}

export type Resolvers = {
  Query: {
    threads: (
      parent: any,
      args: { page?: number; limit?: number },
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<ThreadPage>;
    thread: (
      parent: any,
      args: { id: number },
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<Post | null>;
  };
  Thread: {
    author: (
      parent: Post,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<User | null>;
    replies: (
      parent: Post,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<Post[]>;
    reactions: (
      parent: Post,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<ThreadReaction[]>;
  };
  Reply: {
    author: (
      parent: Post,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<User | null>;
    replies: (
      parent: Post,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<Post[]>;
  };
  ThreadReaction: {
    reaction: (
      parent: ThreadReaction,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<Reaction | null>;
    user: (
      parent: ThreadReaction,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => Promise<User | null>;
  };
};
