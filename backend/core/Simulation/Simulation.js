var connection = require("../../db/dbConnection");

class Simulation {
  static async create(userId, payload) {
    return new Promise((resolve, reject) => {
      console.log(userId);
      connection.query(
        `INSERT INTO lattics.simulation 
          (id,
          created_datetime,
          start_datetime,
          end_datetime,
          simulation_batch_id,
          status_simulation_id,
          input_data_url,
          output_data_url,
          owner,
          finished_percentage)
        VALUES (
          NULL,
          now(),
          NULL,
          NULL,
          NULL,
          1,
          NULL,
          NULL,
          ?,
          0);`,
        [userId],
        function (error, results, fields) {
          if (error) return reject(error);
          return error ? reject(error) : resolve(results);
        }
      );
    });
  }

  static async list(userId) {
    return new Promise((resolve, reject) => {
      console.log(userId);
      connection.query(
        `SELECT * FROM lattics.simulation WHERE owner = ? ORDER BY start_datetime DESC;
            `,
        [userId],
        function (error, results, fields) {
          if (error) return reject(error);
          return error ? reject(error) : resolve(results);
        }
      );
    });
  }
}

module.exports = Simulation;
