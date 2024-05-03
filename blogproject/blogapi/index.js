const env = require("dotenv");
env.config();
const port = parseInt(process.env.PORTNUMBER) || 5000;
const express = require("express");
const cors = require("cors");
const app = express();
const { json } = require("express");
const { models, db } = require("./db/init");

const pgRegisterRouter = require("./router/pgRegister");
const pgLoginRouter = require("./router/pgLogin");
const pgUserRouter = require("./router/pgUser");
const pgBlogRouter = require("./router/pgBlog");
const pgCommentRouter = require("./router/pgComment");
const pgCategoryRouter = require("./router/pgCategory");
const pgForgetPasswordRouter = require("./router/pgForgetPassword");
const pgVerifyEmailRouter = require("./router/pgVerifiyEmail");
const pgNotificationRouter = require("./router/pgNotification");
const pgLikeRouter = require("./router/pgLike");
const VerifyAccessToken = require("./middleware/authMiddleware");

const pgAdminUserRouter = require("./router/admin/adminUser");
const pgAdminRegisterRouter = require("./router/admin/adminRegister");

const path = require("path");
const errorMiddleware = require("./middleware/errorMiddleware");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http);
// Create an HTTP server using Express app
app.use(express.static("public"));

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger-output.json");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const cron = require("node-cron");
// function logMessage() {
//   console.log("Cron job executed at:", new Date().toLocaleString());
// }

// // Schedule the cron job to run after every 5 seconds
// cron.schedule("*/5 * * * * *", () => {
//   logMessage();
// });

app.use(cors());
app.use(json());

db.sequelize.sync({ alter: true });

app.use("/pg/forget", pgForgetPasswordRouter);
app.use("/pg/notification", pgNotificationRouter);
app.use("/pg/verifyemail", pgVerifyEmailRouter);
app.use("/pg/register", pgRegisterRouter);
app.use("/register/admin", pgAdminRegisterRouter);
app.use("/pg/login", pgLoginRouter);

app.use(VerifyAccessToken);

app.use("/pg/user", pgUserRouter);
app.use("/pg/blog", pgBlogRouter(socketIO));
app.use("/pg/comment", pgCommentRouter);
app.use("/pg/category", pgCategoryRouter);

app.use("/pg/like", pgLikeRouter);

app.use("/admin/pg/user", pgAdminUserRouter);

// app.listen(port, () => {
//   console.log(`Listening to port ${port}`);
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// // Listen for socket.io connections
// socketIO.on("connection", (socket) => {
//   console.log("Client connected", socket.id);

//   // Example event listener
//   socket.on("disconnect", () => {
//     console.log("Client disconnected", socket.id);
//   });
// });
app.use(errorMiddleware);

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

module.exports = app;
