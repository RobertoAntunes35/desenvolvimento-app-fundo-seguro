import amqp from 'amqplib/callback_api.js'

import { RABBIT_MQ_URL } from "../../../config/secrets/secrets.js"
import { DEBTS_TOPIC,DEBTS_UPDATE_ROUTING_KEY } from '../../../config/rabbitmq/queue.js'

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