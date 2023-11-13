import Debts from "../../modules/sales/model/Debts.js";

export async function createInitialDateDebtsMongoDB() {
    // Excluindo todos os dados, primeirament !
    await Debts.collection.drop()

    await Debts.create({
        debts: [
            {
                nome: 'Asteka',
                valor: 1500.00,
                data_entrada: new Date(),
                parcelado: true, 
                parcelas: 3,
                status: 'A VENCER',
                tipo_pagamento: 'BOLETO',
                planejado: true, 
                categoria: 'PAGAMENTO DE FORNECEDOR',
            },
            {
                nome: 'BELLPAR',
                valor: 2500.00,
                data_entrada: new Date(),
                parcelado: false, 
                parcelas: 1,
                status: 'VENCIDO',
                tipo_pagamento: 'DINHEIRO',
                planejado: false, 
                categoria: 'IMPREVISTO MENSAL',
            },
        ],
        user: {
            id: 'a55sd1a5d1',
            name: 'Roberto Antunes',
            email: 'robertoantunes@gmail.com',
            cpf_cnpj: '123.456.789-01',
        },
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date()
    })
    let initialDate = await Debts.find();
    console.info(`Initial data was created: ${JSON.stringify(initialDate, undefined, 4)}`)
}