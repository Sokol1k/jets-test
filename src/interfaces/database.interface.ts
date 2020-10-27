import { Dialect } from 'sequelize'

export interface IDBConfig {
  readonly username: string,
  readonly password: string,
  readonly database: string,
  readonly host: string,
  readonly dialect: Dialect
}