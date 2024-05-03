const express = require("express");
const Blog = require("../models/pgBlog");
const Comment = require("../models/pgComment");
const Like = require("../models/pgLike");
const Notification = require("../models/pgNotification");
const { v4: uuid } = require("uuid");

const pgLikeRouter = express.Router();

// Route to like a blog by its ID
pgLikeRouter.put("/blog/:blogID", async (req, res) => {
  try {
    const likerID = res.locals.user.userID; // ID of the user who liked the blog
    const { blogID } = req.params;

    // Check if the user has already liked the blog
    const existingLike = await Like.findOne({
      where: {
        likerID: likerID,
        blogID,
      },
    });

    if (existingLike) {
      // If the user has already liked the blog, delete the like entry to unlike the blog
      await existingLike.destroy();
      // Decrement likesCount if it's greater than 0
      const blog = await Blog.findByPk(blogID);
      if (blog.likesCount > 0) {
        await blog.decrement("likesCount");
      }

      // Delete the existing like notification
      await Notification.destroy({
        where: {
          senderID: likerID,
          blogID: blogID,
          type: "like",
        },
      });

      return res.status(200).json({ message: "Blog unliked successfully" });
    }

    // If the user hasn't liked the blog yet, create a new like entry to like the blog
    const newLike = await Like.create({
      likeID: uuid(),
      likerID: likerID,
      blogID,
    });
    // Increment likesCount
    const blog = await Blog.findByPk(blogID);
    await blog.increment("likesCount");

    // Create a new like notification
    await Notification.create({
      notificationID: uuid(),
      type: "like",
      seen: "false",
      blogID: blogID,
      senderID: likerID,
      recieverID: blog.blogCreatorID,
      likeID: newLike.likeID, // Add likeID to the Notification
    });

    return res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    console.error("Error toggling like status for blog:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to like a comment by its ID
pgLikeRouter.put("/comment/:commentID", async (req, res) => {
  try {
    const likerID = res.locals.user.userID; // ID of the user who liked the comment
    const { commentID } = req.params;

    // Check if the user has already liked the comment
    const existingLike = await Like.findOne({
      where: {
        likerID: likerID,
        commentID,
      },
    });

    if (existingLike) {
      // If the user has already liked the comment, delete the like entry to unlike the comment
      await existingLike.destroy();
      // Decrement likesCount if it's greater than 0
      const comment = await Comment.findByPk(commentID);
      if (comment.likesCount > 0) {
        await comment.decrement("likesCount");
      }
      return res.status(200).json({ message: "Comment unliked successfully" });
    }

    // If the user hasn't liked the comment yet, create a new like entry to like the comment
    const newLike = await Like.create({
      likeID: uuid(),
      likerID: likerID,
      commentID,
    });
    // Increment likesCount
    const comment = await Comment.findByPk(commentID);
    await comment.increment("likesCount");

    await Notification.create({
      notificationID: uuid(),
      type: "like",
      seen: "false",
      commentID: commentID,
      senderID: likerID,
      recieverID: comment.commentorID,
      likeID: newLike.likeID, // Add likeID to the Notification
    });

    return res.status(200).json({ message: "Comment liked successfully" });
  } catch (error) {
    console.error("Error toggling like status for comment:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = pgLikeRouter;
