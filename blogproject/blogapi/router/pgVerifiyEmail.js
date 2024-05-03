const express = require("express");
const User = require("../models/pgUser");
const pgVerifyEmailRouter = express.Router();

pgVerifyEmailRouter.patch("/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const existingUser = await User.findByPk(userID);
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid UserID" }); // HTTP status code 400 for Bad Request
    }

    if (existingUser.isVerified) {
      return res
        .status(200)
        .json({ message: "Email already verifed, navigate to Login" });
    }
    await User.update(
      { isVerified: true },
      {
        where: {
          userID: userID,
        },
      }
    );
    return res.status(201).json({ message: "Email verified" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = pgVerifyEmailRouter;
