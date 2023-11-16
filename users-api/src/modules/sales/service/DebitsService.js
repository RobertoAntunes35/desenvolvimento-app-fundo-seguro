import OrderRepository from "../repository/OrderRepository.js";
import { sendMessageCreditsUpdadeQueue } from '../../product/rabbitmq/ProductStockUpdate.js'
import * as  httpStatus from "../../../config/constants/httpStatus.js"
import { PENDING, ACCEPTED, REJECTED } from "../status/AccountStatus.js"
import AccountException from "../exception/AccountException.js";
import DebtsRepository from "../repository/DebtsRepository.js";


class DebtsService {
    async createDebts(req) {
        try {
            // Coletando informações de entrada
            let debtsData = req.body;
            let authUser = req;
            
            // Validando se o debito foi passado
            this.validadeDebtsData(debtsData)

            // Criando um debito
            let debts = {
                status: PENDING,
                user: authUser,
                createAt: new Date(),
                updatedAt: new Date(),
                debts: debtsData,
            }
        
            // Salvando debito passado
        let createDebits = await DebtsRepository.save(debts);

        // Enviando a mensagem para o rabbitmq com a criação do debito
        sendMessageCreditsUpdadeQueue(this.createDebts.debits);
        return {
            status: httpStatus.SUCESS,
            createDebits
        }
        } catch (err) {
            return {
                status: err.status ? err.status: httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }
    }

    validadeDebtsData(data) {
        if (!data || data.debts) {
            throw new AccountException(
                httpStatus.BAD_REQUEST,
                "The debts must be informed"
            )
        }
    }
}

export default new DebtsService();