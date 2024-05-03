const express = require("express");
const Blog = require("../models/pgBlog");
const Comment = require("../models/pgComment");
const User = require("../models/pgUser");
const Category = require("../models/pgCategory");
const logger = require("../logger/blogLogger");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");

const pgBlogRouter = express.Router();

module.exports = function (io) {
  // Route toAdd a new blog
  pgBlogRouter.post("/", async (req, res) => {
    try {
      const blogCreatorID = res.locals.user.userID;
      const { title, content, categoryID, tags, coverPic, Pic1, Pic2, Pic3 } =
        req.body;

      if (!title || !content || !blogCreatorID || !categoryID) {
        return res.status(400).send("All fields are required");
      }

      const category = await Category.findByPk(categoryID);
      const user = await User.findByPk(blogCreatorID);

      if (!user) {
        return res
          .status(404)
          .send("User not found. Please register or provide a valid user ID");
      }

      if (!category) {
        return res.status(404).send("Provide a valid category ID");
      }

      const blogID = uuid();
      const lowercaseTags = tags.map((tag) => tag.toLowerCase());

      const newBlog = {
        blogID,
        title,
        content,
        blogCreatorID,
        categoryID,
        tags: lowercaseTags,
        coverPic,
        Pic1,
        Pic2,
        Pic3,
      };

      await Blog.create(newBlog);

      // Emit the new blog post event
      const userName = user.name;
      io.emit("newBlogPost", { title, content, userName }); // Include the notification data
      // logger.info(`Someone posted a blog with title '${title}'`);

      return res.status(201).json({ message: "Blog published" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

  // Route to get all blogs
  pgBlogRouter.get("/", async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        include: [
          {
            model: User, // Assuming User is the model for users
            attributes: ["name", "profilePic"], // Include only name and profilePic fields
          },
        ],
      });
      return res.status(200).json({ allblogs: blogs });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  // Route get a blog by its ID
  pgBlogRouter.get("/:blogID", async (req, res) => {
    try {
      const blogID = req.params.blogID;

      const blog = await Blog.findByPk(blogID, {
        include: { model: User, attributes: ["name", "profilePic", "title"] },
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json(blog);
    } catch (error) {
      console.error("Error fetching Blog:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  // Route to get all blogs of a user
  pgBlogRouter.get("/:authorId/all", async (req, res) => {
    try {
      const blogCreatorID = req.params.authorId; // Extract the author ID from the request parameters
      const blogs = await Blog.findAll({
        where: { blogCreatorID },
        include: { model: User, attributes: ["name", "profilePic"] },
      });

      if (!blogs || blogs.length === 0) {
        return res
          .status(404)
          .json({ message: "No blogs found for this user" });
      }

      return res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  // Route for handling search queries
  pgBlogRouter.get("/search/bytag", async (req, res) => {
    try {
      // Get the search query from the request and remove spaces
      const query = req.query.find.replace(/\s+/g, " ").trim();
      const blogs = await Blog.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { content: { [Op.iLike]: `%${query}%` } },
            {
              tags: {
                [Op.contains]: [query.toLowerCase()],
              },
            },
          ],
        },
      });

      if (blogs.length === 0) {
        return res.json({ message: "Try with another query" });
      }

      return res.status(200).json({ blogs });
    } catch (error) {
      console.error("Error searching blogs:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Route to update a blog by its ID
  pgBlogRouter.put("/:blogID", async (req, res) => {
    try {
      const blogID = req.params.blogID;
      const userID = res.locals.user.userID;

      const blog = await Blog.findByPk(blogID);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Check if the current user is the author of the blog
      if (blog.blogCreatorID !== userID) {
        return res
          .status(403)
          .json({ message: "Unauthorized to update the blog" });
      }

      await blog.update(req.body.blogNewData);

      return res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error("Error updating Blog:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  // Route to delete a blog by its ID
  pgBlogRouter.delete("/:blogID", async (req, res) => {
    try {
      const { blogID } = req.params;
      const currentUserID = res.locals.user.userID;

      // Find the blog with associated comments, likes
      const blog = await Blog.findByPk(blogID, {
        include: [Comment],
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Check if the current user is an admin
      const currentUser = await User.findByPk(currentUserID);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const currentUserRole = currentUser.role;
      if (currentUserRole !== "admin" && currentUserID !== blog.blogCreatorID) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this blog" });
      }

      // Delete associated comments
      await Promise.all(blog.Comments.map((comment) => comment.destroy()));

      // Delete the blog
      await blog.destroy();

      logger.warn(`Someone deleted a blog`);

      return res
        .status(200)
        .json({ message: "Blog and associated activities deleted!" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  return pgBlogRouter;
};
