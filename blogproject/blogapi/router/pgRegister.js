const env = require("dotenv");
env.config();
const saltRound = parseInt(process.env.SALTROUNDS);
const express = require("express");
const User = require("../models/pgUser");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const pgRegisterRouter = express.Router();
const transporter = require("../emailConfig");

const joiUserValidator = require("../validation/user-joi.validator"); // Import the Joi validator

// Add a new user to DB
pgRegisterRouter.post("/", async (req, res) => {
  try {
    const { error } = joiUserValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const userID = uuid();
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "This email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = { userID, name, email, password: hashedPassword };

    const emailContent = {
      from: process.env.ZOHOEMAIL,
      to: email,
      subject: "Blog Site!",
      text: `Dear ${name}, Welcome to blogsite! We are glad to have you on board.
      Please click on the follow this link to verify your email: http://localhost:3000/verifyemail/${userID}`,
    };

    transporter.sendMail(emailContent, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    await User.create(newUser);
    return res
      .status(201)
      .json({ message: "Thanks for registeration", user: newUser }); // HTTP status code 200 for OK
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = pgRegisterRouter;
