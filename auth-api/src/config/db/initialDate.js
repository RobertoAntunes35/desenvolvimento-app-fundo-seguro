import bcrypt from 'bcrypt';
import User from '../../modules/user/model/User.js';

export async function createInitialDate() {
    try {
        // Forçando a sincronização
        await User.sync({force: true});

        // Criando hash do password firt date
        let password = await bcrypt.hash('123456', 10)
        let data_nascimento = new Date()
        let data_registro = new Date()
        
        console.log(password)
        await User.create({
            name: "Roberto Antunes",
            email: "robertoantunes@gmail.com",
            data_nascimento: data_nascimento,
            data_registro: data_registro,
            cpf_cnpj: '123.456.789-01',
            endereco: 'Araras 123',
            password: password,
        })
    } catch (err) {
        console.error(err.message)
    }
}