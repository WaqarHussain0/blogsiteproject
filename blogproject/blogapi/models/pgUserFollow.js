const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/PostgreSQL");

class UserFollow extends Model {}
UserFollow.init(
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "UserFollow",
  }
);

module.exports = UserFollow;
