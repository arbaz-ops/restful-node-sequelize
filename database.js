const Sequelizer = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

module.exports.db = new Sequelizer(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT
  }
);
