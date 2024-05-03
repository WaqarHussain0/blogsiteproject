const express = require("express");
const Category = require("../models/pgCategory");
const { v4: uuid } = require("uuid");
const User = require("../models/pgUser");

const pgCategoryRouter = express.Router();

// Route to Add a new category
pgCategoryRouter.post("/", async (req, res) => {
  try {
    const categoryID = uuid();
    const currentUserID = res.locals.user.userID;
    const currentUser = await User.findByPk(currentUserID);
    const currentUserRole = currentUser.currentUserRole;
    if (currentUserRole !== "admin") {
      return res.json({ message: "Only Admins can add category" });
    }
    const { title, tags } = req.body;

    const isPresent = await Category.findOne({ where: { title } });

    if (!title) {
      return res.status(400).json({ message: "Title is required" }); // HTTP status code 400 for Bad Request
    }
    if (isPresent) {
      return res.status(400).json({ message: "Category aleady exists" }); // HTTP status code 400 for Bad Request
    }

    const newCategory = { categoryID, title, tags };
    await Category.create(newCategory);
    return res.status(201).send(newCategory);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Route to get all categries
pgCategoryRouter.get("/", async (req, res) => {
  try {
    const categries = await Category.findAll();

    if (categries.length == 0) {
      res.status(200).json({ message: "Category table is empty" });
    }
    return res.status(200).json(categries);
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to delete a category by its ID
pgCategoryRouter.delete("/:id", async (req, res) => {
  try {
    const currentUserID = res.locals.user.userID;
    const currentUser = await User.findByPk(currentUserID);
    const currentUserRole = currentUser.role;

    if (currentUserRole !== "admin") {
      return res.json({ message: "Only Admins can add category" });
    }

    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy(categoryID);
    return res.status(200).json({ message: "Category deleted!" });
  } catch (error) {
    console.error("Error fetching Category:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route get a category by its ID
pgCategoryRouter.get("/:id", async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to update a category by its ID
pgCategoryRouter.put("/:id", async (req, res) => {
  try {
    const currentUserID = res.locals.user.userID;
    const currentUser = await User.findByPk(currentUserID);
    const currentUserRole = currentUser.role;

    if (currentUserRole !== "admin") {
      return res.json({ message: "Only Admins can add category" });
    }
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update(req.body);

    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating Category:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to delete all blogs
pgCategoryRouter.delete("/del/all", async (req, res) => {
  try {
    // Find all blogs in the database
    const categories = await Category.findAll();

    // Iterate over each blog and delete it
    await Promise.all(categories.map((category) => category.destroy()));

    return res
      .status(200)
      .json({ message: "All categories deleted successfully" });
  } catch (error) {
    console.error("Error deleting categories:", error);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = pgCategoryRouter;
