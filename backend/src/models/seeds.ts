import sequelize from "../config/database";
import { User } from ".//User";
import { Post } from "./Post";

const seedDatabase = async () => {
  try {
    User.initialize(sequelize);
    Post.initialize(sequelize);

    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { username: "john_doe", email: "john@example.com" },
      { username: "jane_smith", email: "jane@example.com" },
      { username: "alice_jones", email: "alice@example.com" },
      { username: "bob_brown", email: "bob@example.com" },
    ]);

    console.log("Users seeded:", users);

    const posts = await Post.bulkCreate([
      {
        content:
          "<h1>Welcome to Our Forum</h1><p>This is the first post in our discussion board. Feel free to share your thoughts!</p>",
        userId: users[0].id,
        parentId: null,
      },
      {
        content:
          "<h2>Thread on JavaScript</h2><p>JavaScript is a versatile language. What do you think about the latest features in ES2024?</p>",
        userId: users[0].id,
        parentId: null,
      },
      {
        content:
          "<h2>React vs Angular</h2><p>In this thread, let's discuss the pros and cons of using React and Angular for web development.</p>",
        userId: users[1].id,
        parentId: null,
      },
      {
        content:
          "<h2>Favorite Programming Languages</h2><p>What is your favorite programming language and why? Let's share our preferences!</p>",
        userId: users[2].id,
        parentId: null,
      },
      {
        content:
          "<h2>Tips for New Developers</h2><p>If you are just starting in web development, here are some tips to help you succeed.</p>",
        userId: users[3].id,
        parentId: null,
      },
    ]);

    console.log("Posts seeded:", posts);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
