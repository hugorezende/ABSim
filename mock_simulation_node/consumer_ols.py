import pika
import time
credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost',
                                       5672,
                                       '/',
                                       credentials))
channel = connection.channel()
channel.basic_qos(prefetch_count=1)
# channel.queue_declare(queue='simulationTasks', durable=True)

def callback(ch, method, properties, body):
    print("Executing: %r" % body)
    time.sleep(10)
    print("Finished: %r" % body)

channel.basic_consume(queue='simulationTasks', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()