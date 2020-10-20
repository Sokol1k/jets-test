import { Sequelize } from 'sequelize'

export default new Sequelize('admin', 'admin', 'admin', {
    host: "127.0.0.1",
    dialect: "postgres"
})