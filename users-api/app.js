import express from 'express';

import { connectMongoDB } from './src/config/db/dbMongoConfig.js';
import { createInitialDateDebtsMongoDB } from './src/config/db/initialDateDebts.js'
import { createInitialDateCreditsMongoDB } from './src/config/db/initialDateCredits.js'
import { connectRabbitMQ } from './src/config/rabbitmq/rabbitConfig.js'
import checkToken from './src/config/auth/checkToken.js';



const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDB();
createInitialDateDebtsMongoDB();
createInitialDateCreditsMongoDB();
connectRabbitMQ();

// Protegendo a Aplicacao
app.use(checkToken)
app.get("/api/status", async (req, res) => {
    return res.status(200).json({
        service: "DEBTS-API",
        status: "UP",
        httpStatus: 200,
    })
})

app.listen(PORT, () => {
    console.info(`Server was started sucessfully at port ${PORT}`)
});