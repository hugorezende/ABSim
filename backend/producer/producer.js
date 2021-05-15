var amqp = require("amqplib");
let Simulation = require("../models/Simulation");
var config = require("../config/config");

var credential_user = config.RABBITMQ_USER;
var credential_pass = config.RABBITMQ_PASS;

const options = {
  credentials: require("amqplib").credentials.plain(
    credential_user,
    credential_pass
  ),
};

function createSimulation(payload) {
  var connection = amqp.connect(`amqp://${config.RABBITMQ_HOST}`, options);
  var queue = "simulationTasks";
  return connection.then(function (connection) {
    return connection
      .createChannel()
      .then(function (ch) {
        var ok = ch.assertQueue(queue);
        return ok
          .then(function (_qok) {
            let returnMessage = ch.sendToQueue(
              queue,
              Buffer.from(JSON.stringify(msg))
            );
            ch.close()
              .then(function () {
                connection.close();
              })
              .catch(console.warn);
            return returnMessage;
          })
          .catch(console.warn);
      })
      .catch(console.warn);
  });
}
module.exports.createSimulation = createSimulation;
