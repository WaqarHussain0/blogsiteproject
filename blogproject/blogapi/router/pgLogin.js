const env = require("dotenv");
env.config();
const express = require("express");
const User = require("../models/pgUser");
const bcrypt = require("bcrypt");
const pgLoginRouter = express.Router();
const jwt = require("jsonwebtoken");

pgLoginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email, password)) {
      return res.status(400).json({ message: "All fields are required" }); // HTTP status code 400 for Bad Request
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // HTTP status code 404 for Not Found
    }

    const verifiedUser = user.isVerified;

    if (!verifiedUser) {
      return res.json({ message: "Verify your email first" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign(
        {
          userID: user.userID,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10h",
        }
      );

      return res
        .status(200)
        .json({ message: "Welcome Back",profilePic: user.profilePic, token: accessToken }); // HTTP status code 200 for OK
    } else {
      return res.status(401).json({ message: "Incorrect email or password" }); // HTTP status code 401 for Unauthorized
    }
  } catch (error) {
    return res.status(500).send(error.message); // HTTP status code 500 for Internal Server Error
  }
});

module.exports = pgLoginRouter;
