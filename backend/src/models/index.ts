import { Sequelize } from "sequelize";
import { User } from "./User";
import { Post } from "./Post";
import { Reaction } from "./Reaction";
import { ThreadReaction } from "./ThreadReaction";
import sequelize from "../config/database";

export { User, Post, Reaction, ThreadReaction };

export const initializeModels = async () => {
  User.initialize(sequelize);
  Post.initialize(sequelize);
  Reaction.initialize(sequelize);
  ThreadReaction.initialize(sequelize);

  User.associate({ Post, ThreadReaction });
  Post.associate({ User, ThreadReaction, Post });
  ThreadReaction.associate({ Post, User, Reaction });

  try {
    await sequelize.sync();
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize models:", error);
  }
};
