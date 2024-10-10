import { Model, DataTypes, Sequelize } from "sequelize";

export class ThreadReaction extends Model {
  public id!: number;
  public postId!: number;
  public userId!: number;
  public reactionId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    ThreadReaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        postId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        reactionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "thread_reactions",
        timestamps: true,
      }
    );
  }

  public static associate(models: any) {
    ThreadReaction.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
    ThreadReaction.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    ThreadReaction.belongsTo(models.Reaction, {
      foreignKey: "reactionId",
      as: "reaction",
    });
  }
}
