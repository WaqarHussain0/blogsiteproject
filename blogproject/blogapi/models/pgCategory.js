const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/PostgreSQL");

class Category extends Model {}
Category.init(
  {
    categoryID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Category",
  }
);

module.exports = Category;
