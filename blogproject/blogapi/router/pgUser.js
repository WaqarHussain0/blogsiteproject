const express = require("express");
const User = require("../models/pgUser");
const Comment = require("../models/pgComment");
const Blog = require("../models/pgBlog");
const Like = require("../models/pgLike");
const UserFollow = require("../models/pgUserFollow");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");
const pgUserRouter = express.Router();

pgUserRouter.get("/profileview/:userID", async (req, res) => {
  try {
    const userId = req.params.userID;

    const checkUser = await User.findOne({ where: { userID: userId } });
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          as: "Blogs",
        },
        {
          model: UserFollow,
          as: "UserFollows",
        },
      ],
    });

    const userData = {
      userID: user.userID,
      name: user.name,
      profilePic: user.profilePic,
      bio: user.bio,
      title: user.title,
      blogs: user.Blogs, // Using the alias 'Blogs' for associated blogs
      followers: user.UserFollows, // Using the alias 'UserFollows' for associated followers
    };

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to get a user by its ID
pgUserRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request parameters
    const user = await User.findByPk(userId); // Find the user by its primary key (ID)

    const currentUserID = res.locals.user.userID;
    if (currentUserID !== userId) {
      return res.json({ message: "Incorrect ID" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to update a user by its ID
pgUserRouter.put("/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const currentUserID = res.locals.user.userID;

    if (currentUserID !== userID) {
      return res.json({ message: "Incorrect ID" });
    }

    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, title, profilePic, bio } = req.body.userNewData;

    const updatedUser = { name, title, profilePic, bio };
    await user.update(updatedUser);

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to delete a user by its ID
pgUserRouter.delete("/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const currentUserID = res.locals.user.userID;
    if (currentUserID !== userID) {
      return res.json({ message: "Incorrect ID" });
    }

    // Find the user with associated activities (blogs, comments, likes)
    const user = await User.findByPk(userID, {
      include: [Blog, Comment, Like],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from followers and following lists
    await UserFollow.destroy({
      where: {
        [Op.or]: [
          { followingID: userID }, // Remove user from following lists
          { followerID: userID }, // Remove user from followers lists
        ],
      },
    });

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
    console.error("Error deleting user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to get a user's followers
pgUserRouter.get("/:userId/followers", async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await UserFollow.findAll({
      where: { followingID: userId },
      include: [
        {
          model: User,
          as: "Follower",
          attributes: ["userID", "name", "profilePic"],
        },
      ],
    });

    if (followers.length === 0) {
      return res.status(200).json({ message: "No followings" });
    }
    return res.json(followers.map((follower) => follower.Follower));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get a user's followings
pgUserRouter.get("/:userId/following", async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await UserFollow.findAll({
      where: { followerID: userId },
      include: [
        {
          model: User,
          as: "Following",
          attributes: ["userID", "name", "profilePic"],
        },
      ],
    });

    if (following.length === 0) {
      return res.status(200).json({ message: "No followings" });
    }
    return res.json(following.map((following) => following.Following));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to follow/unfollow a user
pgUserRouter.post("/:userId/follow", async (req, res) => {
  try {
    const userId = req.params.userId;
    const followerId = res.locals.user.userID; // Assuming the client sends the follower's ID in the request body

    // Check if the follower ID is provided
    if (!followerId) {
      return res.status(400).json({ message: "Follower ID is required" });
    }

    // Check if the user and follower exist
    const user = await User.findByPk(userId);
    const follower = await User.findByPk(followerId);
    if (!user || !follower) {
      return res.status(404).json({ message: "User or follower not found" });
    }

    // Check if the user is trying to follow themselves
    if (userId === followerId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if the user is already being followed
    const existingFollow = await UserFollow.findOne({
      where: { followingID: userId, followerID: followerId },
    });

    if (existingFollow) {
      // If user is already following, then unfollow
      await existingFollow.destroy();
      return res.status(200).json({ message: "You have unfollowed this user" });
    } else {
      // If user is not following, then follow
      await UserFollow.destroy({
        where: { followingID: userId, followerID: followerId },
      }); // Delete any existing follow entry
      await UserFollow.create({
        _id: uuid(),
        followingID: userId,
        followerID: followerId,
      });
      return res
        .status(200)
        .json({ message: "You are now following this user" });
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

pgUserRouter.get("/getalluserinfo/all", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["userID", "name", "profilePic", "title"],
    });

    if (!users || users.length === 0) {
      return res.status(204).json({ message: "No User not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = pgUserRouter;
