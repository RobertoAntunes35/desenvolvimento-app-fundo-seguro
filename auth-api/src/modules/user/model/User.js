import Sequelize from 'sequelize'

import sequelize from '../../../config/db/dbConfig.js'

const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    data_registro: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    cpf_cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }}, {}
    )

export default User