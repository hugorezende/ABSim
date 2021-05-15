const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "lattics",
  "admin",
  "admin123",
  {
    host: "db",
    dialect: "mysql",
  }
);

module.exports = sequelize;
