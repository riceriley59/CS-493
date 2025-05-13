const amqp = require('amqplib')
const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost'
const rabbitmqUrl = `amqp://${rabbitmqHost}`

let _channel = null
let _closeConnection = null

async function connectToRabbit() {
  const connection = await amqp.connect(rabbitmqUrl)
  const channel = await connection.createChannel()

  await channel.assertQueue('images')

  _channel = channel
  _closeConnection = function () {
    connection.close()
  }
}
exports.connectToRabbit = connectToRabbit

function getChannel() {
  return _channel
}
exports.getChannel = getChannel

function closeConnection(callback) {
  _closeConnection(callback)
}
exports.closeConnection = closeConnection
