import pika
import time
import requests
import json
from pika import exceptions, spec

# SCRIPT TO MOCK SIMULATION CONSUMPTION

API_ENDPOINT = "http://localhost:3000/simulation/"
LOGIN_ENDPOINT = "http://localhost:3000/auth/login/"
USER = "admin@admin.com"
PASS = "admin"
TOKEN = ''

credentials = pika.PlainCredentials('guest', 'guest')

backendToken = requests.post(LOGIN_ENDPOINT, {'user': USER, 'password': PASS})

if(backendToken.status_code == 200):
    TOKEN = json.loads(backendToken.text)['accessToken']
else:
    raise Exception("Could not verify credentials in backend")


def on_get_empty(test):
    connection.ioloop.stop()
    connection.close()


def on_open_connection(connection):
    channel = connection.channel()
    channel.add_callback(callback=on_get_empty, replies=[spec.Basic.GetEmpty],
                         one_shot=False)
    messages = channel.basic_get(queue='simulationTasks',
                                 callback=processMessages, auto_ack=True)


def processMessages(channel, method, properties, body):

    simulation = json.loads(body.decode('utf-8'))
    print("Executing: %r" % simulation['simulationId'])
    headers = {"Authorization": "Bearer "+TOKEN}
    requests.put(
        API_ENDPOINT + str(simulation['simulationId']), data={'status': 2}, headers=headers)

    for percentage in range(0, 100):
        print("Simulation %r %r%%..." %
              (simulation['simulationId'], percentage))
        r = requests.put(API_ENDPOINT + str(simulation['simulationId']), data={
            'finishedPercentage': percentage}, headers=headers)
        time.sleep(.5)

    requests.put(API_ENDPOINT + str(simulation['simulationId']), data={
                 'status': 4, 'finishedPercentage': 100}, headers=headers)

    print("Finished: %r" % body)
    connection.ioloop.stop()
    connection.close()


print(' [*] Waiting for messages. To exit press CTRL+C')

while True:
    connection = pika.SelectConnection(pika.ConnectionParameters('localhost',
                                                                 5672,
                                                                 '/',
                                                                 credentials), on_open_callback=on_open_connection)

    try:
        connection.ioloop.start()
    except KeyboardInterrupt:
        connection.close()
        connection.ioloop.start()

    print('Waiting...')
    time.sleep(1)
