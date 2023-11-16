import Credits from "../../modules/sales/model/Credits.js";

export async function createInitialDateCreditsMongoDB() {
    await Credits.collection.drop();

    await Credits.create({
        credits: [
            {
                descricao: 'Pagamento Mensal',
                valor: 1200.00,
                periodicidade_pagamento: 'SEMANAL',
                data_entrada: new Date(),
                metodo_pagamento: 'DINHEIRO'
            }
        ],
        user: {
            id: 'a55sd1a5d1',
            name: 'Roberto Antunes',
            email: 'robertoantunes@gmail.com',
            cpf_cnpj: '123.456.789-01',
        },
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    let initialDate = await Credits.find()
    console.info(`The initial date to credits was: ${JSON.stringify(initialDate, undefined, 4)}`)
}