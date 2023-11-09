import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js"
import UserException from "../../exception/UserException.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as secrets from "../../../config/constants/secrets.js"
import AuthException from "../../../config/auth/AuthException.js";
// Classe responsável por tratar os paramos do endpoint e passar 
// para a classe UserRepository encontrar no banco de dados

class UserService {
    async findByEmail(req) {
        try {
            const {email} = req.params;
            const {authUser} = req
            this.validateResquestData(email)
            console.log(email)
            let user_find = await UserRepository.findByEmail(email);
            
            this.validadeUserFound(user_find)
            this.validateAutenticateUser(user_find, authUser)

            return {
                status: httpStatus.SUCESS,
                user: {
                    id: user_find.id, 
                    name: user_find.name,
                    cpf_cnpj: user_find.cpf_cnpj
                }
            }
        
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }
    }
    // Validando se a requisição foi passada 
    validateResquestData(email) {
        if(!email) {
            throw new UserException(
                httpStatus.INTERNAL_SERVER_ERROR,
                "User email was not informed"
            )
        }
    }

    // Validando se o usuario foi encontrado
    validadeUserFound(user) {
        if(!user) {
            throw new UserException(
                httpStatus.BAD_REQUEST,
                "User was not informed"
            )
        }
    }

    // Validando o token de acesso 
    validadeAcessToken(cpf_cnpj, password) {
        if (!cpf_cnpj || !password) {
            throw new AuthException(
                httpStatus.UNAUTHORIZED,
                "CPF or CNPF and PASSWORD must be informed"
            )
        }
    }

    // Pegando o Token 
    async getAcessToken(req) {
        try {
            const { cpf_cnpj, password } = req.body 
            this.validadeAcessToken(cpf_cnpj, password)
            let user = await UserRepository.findByCpfOrCnpj(cpf_cnpj)
            await this.validatePassword(password, user.password)
            let authUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf_cnpj: user.cpf_cnpj
            }
            const acessToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn:"1h"})
            return {
                status: httpStatus.SUCESS,
                acessToken
            }
        } catch (err) {
            throw new AuthException(
                httpStatus.FORBBIDEN,
                "User not found"
            )
        }
    }

    // Validando password
    async validatePassword(password, hashPassword) {
        if(! await bcrypt.compare(password, hashPassword)) {
            throw new AuthException(
                httpStatus.UNAUTHORIZED,
                "Password doens't match"
            )
        }
    }
    // Validando Autenticação 
    validateAutenticateUser(user, authUser) {
        if (!authUser || user.id !== authUser.id) {
            throw new AuthException(
                httpStatus.UNAUTHORIZED,
                "Error to authenticate the user"
            )
        }
    }

}

export default new UserService();
