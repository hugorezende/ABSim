var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "db",
  user: "admin",
  password: "admin123",
  database: "lattics",
  multipleStatements: true,
});

module.exports = connection;
