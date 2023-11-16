import amqp from 'amqplib/callback_api.js'


import { RABBIT_MQ_URL } from "../../../config/secrets/secrets.js"
import {
    CREDITS_TOPIC, 
    CREDITS_UPDATE_ROUTING_KEY,
    DEBTS_TOPIC,
    DEBTS_UPDATE_ROUTING_KEY
} from '../../../config/rabbitmq/queue.js'

export function sendMessageCreditsUpdadeQueue (message) {
    amqp.connect(RABBIT_MQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error; 
            }
        let jsonStringMessageCredits = JSON.stringify(message);
        console.info(`Sendo Mensage to product update stock: ${jsonStringMessageCredits}`)
            channel.publish(
                CREDITS_TOPIC,
                CREDITS_UPDATE_ROUTING_KEY,
                Buffer.from(jsonStringMessageCredits)
        );
        console.info("Message was send successfully")
    });
});
}

export function sendMessageDebtsUpdateQueue(message) {
    amqp.connect(RABBIT_MQ_URL, (error, connection) => {
        if(error) {
            throw error; 
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }
        let jsonStringMessageDebts = JSON.stringify(message);
        console.info(`Send Message to debts update: ${jsonStringMessageDebts}`)
        channel.publish(
            DEBTS_TOPIC,
            DEBTS_UPDATE_ROUTING_KEY,
            Buffer.from(jsonStringMessageDebts)
        );
        console.info("Message was send successfully")
    })
    })
}