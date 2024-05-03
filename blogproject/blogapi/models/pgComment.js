
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/PostgreSQL");



class Comment extends Model {}
Comment.init(
  {

    commentID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName:'Comment'
  }
);


module.exports = Comment;
