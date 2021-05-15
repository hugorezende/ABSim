import random
import pika

credentials = pika.PlainCredentials('user', 'bitnami')
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost',
                                       5672,
                                       '/',
                                       credentials))
channel = connection.channel()
channel.queue_declare(queue='simulations')

for c in range(5):
    body = "Simulation " + str(random.randrange(50 , 100))
    channel.basic_publish(exchange='',
                          routing_key='simulations',
                          body=body)

print(" [x] Sent 'Hello World!'")