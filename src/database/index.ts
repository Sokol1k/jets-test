import { Sequelize, Dialect } from 'sequelize'
import config from "config"
import User from './models/user.model'

interface iDBConfig {
    readonly username: string,
    readonly password: string,
    readonly database: string,
    readonly host: string,
    readonly dialect: Dialect
}

const env : string = process.env.NODE_ENV || "development"

const dbConfig : iDBConfig = config.get(env)

const sequelize : Sequelize =  new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
)

export default {
    Sequelize,
    sequelize,
    User: User(sequelize, Sequelize)
};