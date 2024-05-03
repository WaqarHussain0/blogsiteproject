const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/PostgreSQL");

class Blog extends Model {}
Blog.init(
  {
    blogID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Pic1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Pic2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Pic3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Blog",
  }
);

module.exports = Blog;
