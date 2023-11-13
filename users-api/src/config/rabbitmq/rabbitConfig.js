import amqp from 'amqplib/callback_api.js'

import {RABBIT_MQ_URL} from '../secrets/secrets.js'

import * as queues from './queue.js'

const HALF_SECOND = 500
const HALF_MINUTE = 30000;
const CONTAINER_ENV = 'container';

export async function connectRabbitMQ() {
    const env = process.env.NODE_ENV;
    console.info(env)
    if(CONTAINER_ENV === env) {
        console.info("Waiting for rabbitMQ to start ...");
        setInterval(() => {
            connectRabbitMqAndCreateQueues()
        }, HALF_MINUTE)
    } else {
        await connectRabbitMqAndCreateQueues()
    }
}
async function connectRabbitMqAndCreateQueues() {
    amqp.connect(RABBIT_MQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }
        createQueue(connection, 
            queues.CREDITS_UPDATE_QUEUE,
            queues.CREDITS_UPDATE_ROUTING_KEY,
            queues.CREDITS_TOPIC
            )
        createQueue(connection, 
            queues.USER_CONFIRMATION_QUEUE,
            queues.USER_CONFIRMATION_ROUTING_KEY,
            queues.CREDITS_TOPIC)
        
        createQueue(connection, 
            queues.DEBTS_UPDATE_QUEUE,
            queues.DEBTS_UPDATE_ROUTING_KEY,
            queues.DEBTS_TOPIC
            )
        createQueue(connection, 
            queues.USER_CONFIRMATION_QUEUE,
            queues.USER_CONFIRMATION_ROUTING_KEY,
            queues.DEBTS_TOPIC
            )
        setTimeout(function () {
            connection.close();
        }, HALF_SECOND)
    })
}
function createQueue(connection, queue, routingKey, topic) {
    connection.createChannel((error, channel) => {
        if (error) {
            throw error;
        }
        channel.assertExchange(topic, 'topic', {durable : true});
        channel.assertQueue(queue, {durable : true});
        channel.bindQueue(queue, topic, routingKey)
    })
}