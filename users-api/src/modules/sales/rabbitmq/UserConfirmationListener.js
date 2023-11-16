import amqp from 'amqplib/callback_api.js'


import { RABBIT_MQ_URL } from "../../../config/secrets/secrets.js"
import {USER_CONFIRMATION_QUEUE} from '../../../config/rabbitmq/queue.js'

// Adaptar para o codigo em questão (mobile)
export function listenToUserConfirmationQueue() {
    amqp.connect(RABBIT_MQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }
        console.info("Listen to user confirmation queue ...")
        connection.createChannel((error, channel) => {
            if (error) {
                throw error; 
            }
            channel.consume(USER_CONFIRMATION_QUEUE, (message) => {
                console.info(`Recieving message from queue: ${message.content.toString()}`)
            }, {
                noAck: true,
            })
        })
    });
}