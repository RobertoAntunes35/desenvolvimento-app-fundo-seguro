import { sendMessageCreditsUpdadeQueue } from '../../product/rabbitmq/ProductStockUpdate.js'
import * as  httpStatus from "../../../config/constants/httpStatus.js"
import { PENDING, ACCEPTED, REJECTED } from "../status/AccountStatus.js"
import AccountException from "../exception/AccountException.js";
import CreditsRepository from "../repository/CreditsRepository.js";

class CreditsService {
    async createCredits(req) {
        try {
            let creditsData  = req.body;
            const { authUser } = req;
            const { authorization } = req.header;

            this.validadeCreditsData(creditsData)
            let credits = this.createInitialOrderData(credits, authUser)
            this.sendMessage(credits)
            let createCredits =  await CreditsRepository.save(credits);
            return {
                status: httpStatus.SUCESS,
                createCredits,
            }
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }
    }
    validadeCreditsData(data) {
        if(!data || data.credits) {
            throw new AccountException(
                httpStatus.BAD_REQUEST,
                "The credits must be informed")
        }
    }
    async updateCredits(creditsMessage) {
        try {
            const credits = JSON.parse(creditsMessage);
            if (credits.salesId && credits.status) {
                let existingCredits = await CreditsRepository.findById(credits.credits_id)
                if (existingCredits && order.status !== existingCredits.status) {
                    existingCredits.status = order.status;
                    await CreditsRepository.save(existingCredits)
                }
            }
            else {
               console.warn('The order message was not complete.') 
            }
        } catch (err) {
            console.error("Could not aparse order message from queue");
            console.error(err.message);
        }
    }
    async validadeStockProduct(order) {
    let creditsIsOk = true;
        if (creditsIsOk) {
            throw new AccountException(
                httpStatus.BAD_REQUEST,
                "The credits isn't ok"
                )
        }
    }
    createInitialOrderData(orderData, authUser) {
        let credits = {
            status: PENDING,
            user: authUser,
            createdAt: new Date(),
            updatedAt: new Date(),
            credits: creditsData,
        }
    } 
    sendMessage(createCredits) {
        const message = {
            salesId: createCredits.id,
            products: createCredits.products
        }
        sendMessageCreditsUpdadeQueue(message);

    }
}

export default new CreditsService();