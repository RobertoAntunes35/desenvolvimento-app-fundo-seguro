import AuthException from "../../../config/auth/AuthException.js";
import User from "../model/User.js";
import * as httpStatus from '../../../config/constants/httpStatus.js'

// Classe das funções que comunicam com o banco de dados
class UserRepository {
    // Os cacth em caso de erro, esta parando a aplicação, resolver
    async findByEmail(email){
        try {
            return await User.findOne({where: {email}});
            
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }

    async findById(id) {
        try {
            return await User.findOne({where:{id}});
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }
    async findByCpfOrCnpj(cpf_cnpj) {
        try {
            return await User.findOne({where:{cpf_cnpj}});
        } catch (err){
            throw new AuthException(
                httpStatus.BAD_REQUEST,
                err.message
            )
        }
    }
}

export default new UserRepository();