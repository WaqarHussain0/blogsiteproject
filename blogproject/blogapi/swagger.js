const dotenv = require("dotenv");
dotenv.config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Blog Web APIs",
    description: "A basic project to test APIs, JWT and Swagger",
  },
  host: `localhost:${process.env.PORTNUMBER}`,

};

const outputFile = "./swagger-output.json";
const routes = [
  "./router/blogs.js",
  "./router/comment.js",
  "./router/login.js",
  "./router/register.js",
  "./router/users.js",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
