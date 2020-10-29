import { Sequelize } from 'sequelize'
import config from "config"
import User from './models/user.model'
import File from './models/file.model'
import { IDBConfig } from '../interfaces/database.interface'

const env : string = process.env.NODE_ENV || "development"

const dbConfig : IDBConfig = config.get(env)

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
    User: User(sequelize),
    File: File(sequelize)
};