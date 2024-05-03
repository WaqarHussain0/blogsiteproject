const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/pgUser");
const transporter = require("../emailConfig");
const bodyParser = require("body-parser");

const pgForgetPasswordRouter = express.Router();
pgForgetPasswordRouter.use(bodyParser.urlencoded({ extended: true }));

// Route to initiate password reset
pgForgetPasswordRouter.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate a reset token using bcrypt
    const token = crypto.randomBytes(20).toString("hex");

    // Store the token with the user's email in the database
    user.resetToken = token;
    await user.save();
    // Send the reset token to the user's email
    const emailContent = {
      from: process.env.ZOHOEMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/reset/${token}`,
    };

    transporter.sendMail(emailContent, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }

      console.log(`Email sent: ${info.response}`);
      return res.status(200).json({
        message: "Check your email for instructions on resetting your password",
      });
    });
  } catch (error) {
    console.error("Error initiating password reset:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to update the password
pgForgetPasswordRouter.post("/:token", async (req, res) => {
  try {
    const token = req.params.token; // Corrected: Use token instead of tokenID
    const { password } = req.body;

    const user = await User.findOne({ where: { resetToken: token } }); // Corrected: Use token instead of tokenID
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid or expired password token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update user's password and reset token
    user.password = hashedPassword;
    user.resetToken = null; // Assuming the resetToken column is nullable
    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = pgForgetPasswordRouter;
