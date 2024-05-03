const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const User = require("../../models/pgUser");
const transporter = require("../../emailConfig");
const joiUserValidator = require("../../validation/user-joi.validator");

const pgAdminRegisterRouter = express.Router();

pgAdminRegisterRouter.post("/", async (req, res, next) => {
  try {
    const { error } = joiUserValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { name, email, password } = req.body;
    const adminRole = "admin";

   

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send("This email already exists");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALTROUNDS)
    );

    const newUser = {
      userID: uuid(),
      name,
      email,
      password: hashedPassword,
      role: adminRole,
    };

    const emailContent = {
      from: process.env.ZOHOEMAIL,
      to: email,
      subject: "Blog Site - Welcome!",
      text: `Dear ${name}, Welcome to Blog Site! You've been registered as an admin.
      Please click on the following link to verify your email: http://localhost:3000/pg/verifyemail/${newUser.userID}`,
    };

    transporter.sendMail(emailContent, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    await User.create(newUser);

    return res.status(201).send(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
});

module.exports = pgAdminRegisterRouter;
