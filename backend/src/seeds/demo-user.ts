import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "john_doe",
          email: "john@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "jane_smith",
          email: "jane@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "alice_jones",
          email: "alice@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "bob_brown",
          email: "bob@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(
      "users",
      {
        username: ["john_doe", "jane_smith", "alice_jones", "bob_brown"],
      },
      {}
    );
  },
};
