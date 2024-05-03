const express = require("express");
const User = require("../../models/pgUser");
const Comment = require("../../models/pgComment");
const Blog = require("../../models/pgBlog");
const Like = require("../../models/pgLike");
const pgAdminUserRouter = express.Router();

// Route to get all users
pgAdminUserRouter.get("/", async (req, res, next) => {
  try {
    const userID = res.locals.user.userID;
    const currentUser = await User.findByPk(userID);
    if (currentUser.role !== "admin") {
      const error = new Error("Protected Route");
      error.statusCode = 401;
      throw error;
    }
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
});

// Route to get a user by its ID
pgAdminUserRouter.get("/:id", async (req, res, next) => {
  try {
    const currentUserID = res.locals.user.userID;
    const x = await User.findByPk(currentUserID);
    if (x.role !== "admin") {
      const error = new Error("Protected Route");
      error.statusCode = 401;
      throw error;
    }
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(user);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
});

// Route to update a user by its ID
pgAdminUserRouter.put("/:id", async (req, res, next) => {
  try {
    const currentUser = res.locals.user.userID;
    const x = await User.findByPk(currentUser);

    if (x.role !== "admin") {
      // return res.json({ message: "Protected route!" });
      const error = new Error("Protected Route");
      error.statusCode = 401;
      throw error;
    }

    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const { role } = req.body;
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const updatedUser = { role };

    await user.update(updatedUser);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
});

// Route to delete a user by its ID
pgAdminUserRouter.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const currentUser = res.locals.user.userID;
    const x = await User.findByPk(currentUser);

    if (x.role !== "admin") {
      // return res.json({ message: "Protected route!" });
      const error = new Error("Protected Route");
      error.statusCode = 401;
      throw error;
    }

    // Find the user with associated activities (blogs, comments, likes)
    const user = await User.findByPk(userId, {
      include: [Blog, Comment, Like],
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Delete associated activities (blogs, comments, likes)
    await Promise.all([
      ...user.Blogs.map((blog) => blog.destroy()),
      ...user.Comments.map((comment) => comment.destroy()),
      ...user.Likes.map((like) => like.destroy()),
    ]);

    // Delete the user
    await user.destroy();

    return res
      .status(200)
      .json({ message: "User and associated activities deleted successfully" });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
});

module.exports = pgAdminUserRouter;
