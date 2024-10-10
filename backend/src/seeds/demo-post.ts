import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          content:
            "<h1>Welcome to Our Forum</h1><p>This is the first post in our discussion board. Feel free to share your thoughts!</p>",
          userId: 1,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "<h2>Thread on JavaScript</h2><p>JavaScript is a versatile language. What do you think about the latest features in ES2024?</p>",
          userId: 1,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "<h2>React vs Angular</h2><p>In this thread, let's discuss the pros and cons of using React and Angular for web development.</p>",
          userId: 2,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "<h2>Favorite Programming Languages</h2><p>What is your favorite programming language and why? Let's share our preferences!</p>",
          userId: 3,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "<h2>Tips for New Developers</h2><p>If you are just starting in web development, here are some tips to help you succeed.</p>",
          userId: 4,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "<h2>Post with a Reply</h2><p>This is a parent post. <strong>Reply to this!</strong></p>",
          userId: 1,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "<p>This is a reply to the parent post.</p>",
          userId: 2,
          parentId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "<p>Here's another reply to the same thread!</p>",
          userId: 3,
          parentId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(
      "posts",
      {
        content: [
          "<h1>Welcome to Our Forum</h1><p>This is the first post in our discussion board. Feel free to share your thoughts!</p>",
          "<h2>Thread on JavaScript</h2><p>JavaScript is a versatile language. What do you think about the latest features in ES2024?</p>",
          "<h2>React vs Angular</h2><p>In this thread, let's discuss the pros and cons of using React and Angular for web development.</p>",
          "<h2>Favorite Programming Languages</h2><p>What is your favorite programming language and why? Let's share our preferences!</p>",
          "<h2>Tips for New Developers</h2><p>If you are just starting in web development, here are some tips to help you succeed.</p>",
          "<h2>Post with a Reply</h2><p>This is a parent post. <strong>Reply to this!</strong></p>",
          "<p>This is a reply to the parent post.</p>",
          "<p>Here's another reply to the same thread!</p>",
        ],
      },
      {}
    );
  },
};
