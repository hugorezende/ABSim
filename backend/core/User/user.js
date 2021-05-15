var connection = require("../../db/dbConnection");

class User {
  static async getUserAuth(email, password) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email = ? AND password = MD5(?)",
        [email, password],
        function (error, results, fields) {
          if (error) throw error;
          return error ? reject(error) : resolve(results);
        }
      );
    });
  }
}

module.exports = User;
