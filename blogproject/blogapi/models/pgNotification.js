const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/PostgreSQL");

class Notification extends Model {}

Notification.init(
  {
    notificationID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("comment", "like", "blog"),
      defaultValue: "blog",
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    timestamps: true,
    modelName: "Notification", // We need to choose the model name
  }
);
module.exports = Notification;
