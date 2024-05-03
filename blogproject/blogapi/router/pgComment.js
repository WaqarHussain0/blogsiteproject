const express = require("express");
const Comment = require("../models/pgComment");
const User = require("../models/pgUser");
const Blog = require("../models/pgBlog");

const Notification = require("../models/pgNotification");
const transporter = require("../emailConfig");

const { v4: uuid } = require("uuid");

const pgCommentRouter = express.Router();

// Route to Add a new comment
pgCommentRouter.post("/:blogID", async (req, res) => {
  try {
    const { blogID } = req.params;
    const commentorID = res.locals.user.userID;
    const commentID = uuid();
    const { content } = req.body;

    if (!content) {
      return res.status(400).send("Content is required"); // HTTP status code 400 for Bad Request
    }

    const blogExist = await Blog.findByPk(blogID);

    if (!blogExist) {
      return res.json({ message: "Enter valid blog id" });
    }

    const blogCreator = await Blog.findOne({
      where: { blogID },
      attributes: ["blogCreatorID"],
    });

    const creatorDetails = await User.findOne({
      where: { userID: blogCreator.blogCreatorID },
      attributes: ["userID","name", "email"],
    });


    const emailContent = {
      from: process.env.ZOHOEMAIL,
      to: creatorDetails.email,
      subject: "Blog Site!",
      text: `Dear ${creatorDetails.name}, Someone commented '${content}' on your blog`,
    };

    transporter.sendMail(emailContent, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    const newComment = { commentID, content, commentorID, blogID };
    const newlyPosted = await Comment.create(newComment);

    await Notification.create({
      notificationID: uuid(),
      recieverID: creatorDetails.userID,
      type: "comment",
      seen: "false",
      commentID: newlyPosted.commentID,
      senderID: newlyPosted.commentorID,
    });

    return res.status(201).json({ message: "Comment Posted" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Route to get all comments of a blog
pgCommentRouter.get("/:blogId", async (req, res) => {
  try {
    const blogID = req.params.blogId;
    const comments = await Comment.findAll({ where: { blogID } });

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this blog" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route get a comment by its ID
pgCommentRouter.get("/onecomment/:id", async (req, res) => {
  try {
    const commentID = req.params.id;
    const comment = await Comment.findByPk(commentID);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching Comment:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to delete a comment by its ID
pgCommentRouter.delete("/:commentID", async (req, res) => {
  try {
    const { commentID } = req.params;

    const comment = await Comment.findByPk(commentID);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Delete the comment
    await comment.destroy();

    return res.status(200).json({
      message: "Comment  deleted!",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to update a comment by its ID
pgCommentRouter.put("/:commentID", async (req, res) => {
  try {
    const { commentID } = req.params;
    const comment = await Comment.findByPk(commentID);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const currentUser = res.locals.user.userID;
    if (currentUser !== comment.commentorID) {
      return res.status(404).json({ message: "You can't update the comment" });
    }

    await comment.update(req.body);

    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating Comment:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = pgCommentRouter;
