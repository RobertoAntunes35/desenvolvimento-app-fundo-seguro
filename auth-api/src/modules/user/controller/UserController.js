// Passando os dados da internet para o serviço

import UserService from "../service/UserService.js";

class UserController {
    async getAcessToken(req, res) {
        console.log(req)
        let acessToken = await UserService.getAcessToken(req);
        return res.status(acessToken.status).json(acessToken)
        // console.log(acessToken)
        // return res.status(acessToken.status).json(acessToken)
    }
    async findByEmail(req, res) {
        let user = await UserService.findByEmail(req);
        return res.status(user.status).json(user)
    }
}

export default new UserController()