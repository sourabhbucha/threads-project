import { Model, DataTypes, Sequelize } from "sequelize";

export class Post extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
  public parentId!: number | null;

  public static initialize(sequelize: Sequelize) {
    Post.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        parentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "posts",
      }
    );
  }

  public static associate(models: any) {
    Post.hasMany(models.ThreadReaction, {
      foreignKey: "postId",
      as: "threadReactions",
    });

    Post.hasMany(models.Post, {
      foreignKey: "parentId",
      as: "replies",
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });
  }
}
