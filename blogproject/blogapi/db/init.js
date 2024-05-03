const User = require("../models/pgUser");
const Blog = require("../models/pgBlog");
const Comment = require("../models/pgComment");
const Category = require("../models/pgCategory");
const UserFollow = require("../models/pgUserFollow");
const Like = require("../models/pgLike");
const Notification = require("../models/pgNotification");

const sequelize = require("./PostgreSQL");
const models = {
  User,
  Blog,
  Comment,
  Category,
  UserFollow,
  Like,
  Notification,
};

Blog.hasMany(Notification, { foreignKey: "blogID", onDelete: "CASCADE" });
Notification.belongsTo(Blog, { foreignKey: "blogID" });

Comment.hasMany(Notification, { foreignKey: "commentID", onDelete: "CASCADE" });
Notification.belongsTo(Comment, { foreignKey: "commentID" });



User.hasMany(Notification, { foreignKey: "senderID", onDelete: "CASCADE" });
// Notification.belongsTo(User, { foreignKey: "senderID" });
Notification.belongsTo(User, { foreignKey: "senderID", as: "Sender" });

User.hasMany(Notification, { foreignKey: "recieverID", onDelete: "CASCADE" });
Notification.belongsTo(User, { foreignKey: "recieverID" });

User.hasMany(Like, { foreignKey: "likerID", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "likerID" });

Like.hasMany(Notification, { foreignKey: "likeID", onDelete: "CASCADE" });
Notification.belongsTo(Like, { foreignKey: "likeID" });

Blog.hasMany(Like, { foreignKey: "blogID", onDelete: "CASCADE" });
Like.belongsTo(Blog, { foreignKey: "blogID" });

Comment.hasMany(Like, { foreignKey: "commentID", onDelete: "CASCADE" });
Like.belongsTo(Comment, { foreignKey: "commentID" });

User.hasMany(Blog, { foreignKey: "blogCreatorID", onDelete: "CASCADE" });
Blog.belongsTo(User, { foreignKey: "blogCreatorID" });

User.hasMany(Comment, { foreignKey: "commentorID", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "commentorID" });

Blog.hasMany(Comment, { foreignKey: "blogID", onDelete: "CASCADE" });
Comment.belongsTo(Blog, { foreignKey: "blogID" });

Category.hasMany(Blog, { foreignKey: "categoryID", onDelete: "CASCADE" });
Blog.belongsTo(Category, { foreignKey: "categoryID" });

User.hasMany(UserFollow, { foreignKey: "followerID", onDelete: "CASCADE" });
UserFollow.belongsTo(User, { as: "Follower", foreignKey: "followerID" });

User.hasMany(UserFollow, { foreignKey: "followingID", onDelete: "CASCADE" });
UserFollow.belongsTo(User, { as: "Following", foreignKey: "followingID" });

const db = {};
db.sequelize = sequelize;

module.exports = { models, db };
