var amqp = require("amqplib");

const options = {
  credentials: require("amqplib").credentials.plain(
    process.env.RABBITMQ_USER,
    process.env.RABBITMQ_PASS
  ),
};

class MQService {
  static publishSimulation(payload) {
    var connection = amqp.connect(
      `amqp://${process.env.RABBITMQ_HOST}`,
      options
    );

    var queue = "simulationTasks";
    return connection.then(function (connection) {
      return connection
        .createChannel()
        .then(function (ch) {
          var ok = ch.assertQueue(queue, { durable: true });
          return ok
            .then(function (_qok) {
              let returnMessage = ch.sendToQueue(
                queue,
                Buffer.from(JSON.stringify(payload)),
                {
                  persistent: true,
                }
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
}

module.exports = MQService;
