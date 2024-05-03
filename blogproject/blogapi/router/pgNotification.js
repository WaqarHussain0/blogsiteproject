const express = require("express");
const Blog = require("../models/pgBlog");
const Comment = require("../models/pgComment");
const Like = require("../models/pgLike");
const User = require("../models/pgUser");
const Notification = require("../models/pgNotification");
const { v4: uuid } = require("uuid");

const pgNotificationRouter = express.Router();

// Route to get comment notifications for a specific user
pgNotificationRouter.get("/:recieverID/comments", async (req, res) => {
  try {
    const { recieverID } = req.params;

    // Fetch comment notifications for the specified user
    const commentNotifications = await Notification.findAll({
      where: { recieverID, type: "comment" }, // Filter by userID and type 'comment'
      include: [{ model: Comment, include: [User] }], // Include associated comment and user
    });

    if (commentNotifications.length === 0) {
      return res.json({
        message: "No comment notifications found for this user",
      });
    }

    // Simplify comment notifications for response
    const simplifiedNotifications = commentNotifications.map((notification) => {
      const userName = notification.Comment.User.name;
      const commentContent = notification.Comment.content;
      const message = `${userName} commented ${commentContent} on your blog`;
      return {
        notificationID: notification.notificationID,
        message,
        seen: notification.seen,
      };
    });

    return res.status(200).json(simplifiedNotifications);
  } catch (error) {
    console.error("Error fetching comment notifications:", error);
    return res.status(500).send("Internal Server Error");
  }
});

pgNotificationRouter.get("/:recieverID/likes", async (req, res) => {
  try {
    const { recieverID } = req.params;

    // Fetch like notifications for the specified user
    const likeNotifications = await Notification.findAll({
      where: { recieverID, type: "like" }, // Filter by recieverID and type 'like'
      include: [
        { model: Blog, include: [User] }, // Include associated blog and user
        { model: User, as: "Sender" }, // Include associated user for senderID
      ],
    });

    if (likeNotifications.length === 0) {
      return res.json({
        message: "No like notifications found for this user",
      });
    }

    // Simplify like notifications for response
    const simplifiedNotifications = likeNotifications.map((notification) => {
      const senderName = notification.Sender
        ? notification.Sender.name
        : "Unknown"; // Get sender's name from associated user
      const blogTitle = notification?.Blog?.title;
      const message = `${senderName} liked your blog "${blogTitle}"`;
      return {
        notificationID: notification.notificationID,
        message,
        seen: notification.seen,
      };
    });

    return res.status(200).json(simplifiedNotifications);
  } catch (error) {
    console.error("Error fetching like notifications:", error);
    return res.status(500).send("Internal Server Error");
  }
});

pgNotificationRouter.get("/:userID/all", async (req, res) => {
  res.json({ message: "Working on this API" });
});

module.exports = pgNotificationRouter;
