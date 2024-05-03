const { Sequelize } = require("sequelize");
// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "piecyfer@786",
  database: "blogsite",
  logging: false,
});

const database = sequelize;

database
  .authenticate()
  .then(console.log("Connected to DB"))
  .catch((error) => console.log(error));

module.exports = database;