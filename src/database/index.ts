import { Sequelize } from 'sequelize'
import User from './models/user.model'

const DATABASE : string = process.env.DB_DATABASE || 'postgres'
const USER : string = process.env.DB_USER || 'admin'
const PASSWORD : string = process.env.DB_PASSWORD || 'root'
const HOST : string = process.env.DB_HOST || '127.0.0.1'
const DIALECT : string = process.env.DB_DIALECT || 'postgres'

const sequelize : Sequelize =  new Sequelize(
    'admin',
    'admin',
    'admin',
    {
        host: '127.0.0.1',
        dialect: 'postgres'
    }
)

const db : any = {
    Sequelize,
    sequelize,
    User: User(sequelize, Sequelize)
};

export default db