import express from 'express';

import { connectMongoDB } from './src/config/db/dbMongoConfig.js';
import { createInitialDateDebtsMongoDB } from './src/config/db/initialDateDebts.js'
import { createInitialDateCreditsMongoDB } from './src/config/db/initialDateCredits.js'
import { connectRabbitMQ } from './src/config/rabbitmq/rabbitConfig.js'
import checkToken from './src/config/auth/checkToken.js';

import { sendMessageDebtsUpdateQueue, sendMessageCreditsUpdadeQueue } from "./src/modules/product/rabbitmq/ProductStockUpdate.js"

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDB();
createInitialDateDebtsMongoDB();
createInitialDateCreditsMongoDB();
connectRabbitMQ();

// Protegendo a Aplicacao
// app.use(checkToken)

app.get('/teste_debts', (req, res) => {
    try {
        sendMessageDebtsUpdateQueue([
            {
                nome: 'Asteka',
                valor: 1500.00,
                data_entrada: new Date(),
                parcelado: true, 
                parcelas: 3,
                status: 'A VENCER',
                tipo_pagamento: 'BOLETO',
                planejado: true, 
                categoria: 'Pagamento Fornecedor'
            }
        ])
        return res.status(200).json({status: 200 })
    } catch (err) {
        return res.json(500).json({
            error: true,
            message: err.message})
        }
})

app.get('/teste_credits', (req, resp) => {
    try {
        sendMessageCreditsUpdadeQueue([
            {
                credits_id: 1001,
                descricao: 'Pagamento Mensal',
                valor: 1200.00,
                periodicidade_pagamento: 'MENSAL',
                data_entrada: new Date(),
                metodo_pagamento: 'DINHEIRO'
            },
            {
                credits_id: 1002,
                descricao: 'Pagamento Semanal',
                valor: 1200.00,
                periodicidade_pagamento: 'SEMANAL',
                data_entrada: new Date(),
                metodo_pagamento: 'BOLETO'
            },
            {
                credits_id: 1003,
                descricao: 'Pagamento Mensal',
                valor: 1200.00,
                periodicidade_pagamento: 'SEMANAL',
                data_entrada: new Date(),
                metodo_pagamento: 'CHEQUE'
            }

        ]);
        return resp.status(200).json({status: 200 })
    } catch (err) {
        console.log(err)
        return resp.status(500).json({error: true})
    }
})

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