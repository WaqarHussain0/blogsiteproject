const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/PostgreSQL");

class Like extends Model {}
Like.init(
  {
    likeID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Like",
  }
);

module.exports = Like;
