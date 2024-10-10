import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      "thread_reactions",
      [
        {
          postId: 1,
          userId: 1,
          reactionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          reactionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          userId: 3,
          reactionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          userId: 4,
          reactionId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(
      "thread_reactions",
      {
        postId: [1, 2, 3],
        userId: [1, 2, 3, 4],
        reactionId: [1, 2, 3, 4],
      },
      {}
    );
  },
};
