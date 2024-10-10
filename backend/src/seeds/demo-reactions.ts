import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      "reactions",
      [
        {
          type: "like",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "love",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "laugh",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "sad",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "angry",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(
      "reactions",
      {
        type: ["like", "love", "laugh", "sad", "angry"],
      },
      {}
    );
  },
};
