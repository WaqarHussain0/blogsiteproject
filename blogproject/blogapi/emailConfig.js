const { createTransport } = require("nodemailer");
const env = require("dotenv");
env.config();
const transporter = createTransport({
  host: process.env.ZOHOHOST,
  port: process.env.ZOHOPORT,
  secure: true,
  auth: {
    user: process.env.ZOHOEMAIL,
    pass: process.env.ZOHOPASSWORD,
  },
});
module.exports = transporter;