import Sequelize from 'sequelize'

// DB LOCAL
// const sequelize = new Sequelize('auth_api', 'postgres', 'mon123', {

// DB EMPRESA
const sequelize = new Sequelize('auth_api', 'postgres', 'mon123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true,
    }
})
// const sequelize = new Sequelize('postgres://postgres:1234@localhost:5434/auth_api')
sequelize
    .authenticate()
    .then(()=> {
        console.info("Connection has been stablished")
    })
    .catch ((err) =>  {
        console.error("Unable to connect to the database")
        console.info(err.message)
    })

    export default sequelize