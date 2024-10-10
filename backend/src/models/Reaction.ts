import { Model, DataTypes, Sequelize } from "sequelize";

export class Reaction extends Model {
  public id!: number;
  public type!: string;

  public static initialize(sequelize: Sequelize) {
    Reaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "reactions",
      }
    );
  }

  public static associate(models: any) {
    Reaction.hasMany(models.ThreadReaction, {
      foreignKey: "reactionId",
      as: "threadReactions",
    });
  }
}
