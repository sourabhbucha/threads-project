import { Model, DataTypes, Sequelize } from "sequelize";

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }

  public static associate(models: any) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
    });

    User.hasMany(models.ThreadReaction, {
      foreignKey: "userId",
      as: "threadReactions",
    });
  }
}
