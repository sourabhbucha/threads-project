import { Resolvers } from "./types";
import { Post, User, Reaction, ThreadReaction } from "../models";
import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
interface CountResult {
  count: number;
}
const resolvers: Resolvers = {
  Query: {
    threads: async (
      _,
      { page = 1, limit = 10 }
    ): Promise<{
      totalItems: number;
      totalPages: number;
      currentPage: number;
      threads: any;
    }> => {
      const offset = (page - 1) * limit;

      const query = `
        WITH RECURSIVE recursive_posts AS (
          SELECT p.id, p.content, p."userId", p."parentId", p."createdAt", 1 AS level,
                 u.username, u.email 
          FROM posts p
          JOIN users u ON p."userId" = u.id
          WHERE p."parentId" IS NULL
          
          UNION ALL
          
          SELECT p.id, p.content, p."userId", p."parentId", p."createdAt", rp.level + 1 AS level,
                 u.username, u.email 
          FROM posts p
          INNER JOIN recursive_posts rp ON p."parentId" = rp.id
          JOIN users u ON p."userId" = u.id
          WHERE rp.level < 4
        )
        SELECT * 
        FROM recursive_posts
        ORDER BY "createdAt" DESC
        LIMIT :limit OFFSET :offset;  -- Use named parameters for limit and offset
      `;

      const rows = await sequelize.query(query, {
        replacements: { limit, offset },
        type: QueryTypes.SELECT,
      });

      const countQuery = `SELECT COUNT(*) FROM posts`;
      const countResult = await sequelize.query<CountResult>(countQuery, {
        type: QueryTypes.SELECT,
      });
      let totalItems = countResult[0].count;

      return {
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        threads: rows.filter((x: any) => x.parentId === null),
      };
    },
    thread: async (_, { id }): Promise<Post | null> => {
      const thread = await Post.findOne({
        where: { id, parentId: null },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"],
          },
          {
            model: Post,
            as: "replies",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "username", "email"],
              },
              // Include nested replies
              {
                model: Post,
                as: "replies",
                include: [
                  {
                    model: User,
                    as: "author",
                    attributes: ["id", "username", "email"],
                  },
                ],
              },
            ],
            order: [["createdAt", "ASC"]],
          },
          {
            model: ThreadReaction,
            as: "threadReactions",
            include: [
              { model: Reaction, as: "reaction", attributes: ["id", "type"] },
              {
                model: User,
                as: "user",
                attributes: ["id", "username", "email"],
              },
            ],
          },
        ],
      });

      return thread;
    },
  },
  Thread: {
    author: async (parent: Post): Promise<User | null> => {
      return await User.findByPk(parent.userId);
    },
    replies: async (parent: Post): Promise<Post[]> => {
      return await Post.findAll({
        where: { parentId: parent.id },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"],
          },
          // Fetch nested replies recursively
          {
            model: Post,
            as: "replies",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "username", "email"],
              },
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });
    },
    reactions: async (parent: Post): Promise<ThreadReaction[]> => {
      return await ThreadReaction.findAll({
        where: { postId: parent.id },
        include: [
          { model: Reaction, as: "reaction", attributes: ["id", "type"] },
          { model: User, as: "user", attributes: ["id", "username", "email"] },
        ],
      });
    },
  },
  Reply: {
    author: async (parent: Post): Promise<User | null> => {
      return await User.findByPk(parent.userId);
    },
    replies: async (parent: Post): Promise<Post[]> => {
      return await Post.findAll({
        where: { parentId: parent.id },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"],
          },
          // Fetch sub-replies recursively
          {
            model: Post,
            as: "replies",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "username", "email"],
              },
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });
    },
  },
  ThreadReaction: {
    reaction: async (parent: ThreadReaction): Promise<Reaction | null> => {
      const reaction = await Reaction.findByPk(parent.reactionId);
      if (!reaction) {
        throw new Error(`Reaction not found for ID ${parent.reactionId}`);
      }
      return reaction;
    },
    user: async (parent: ThreadReaction): Promise<User | null> => {
      const user = await User.findByPk(parent.userId);
      if (!user) {
        throw new Error(`User not found for ID ${parent.userId}`);
      }
      return user;
    },
  },
};

export default resolvers;
