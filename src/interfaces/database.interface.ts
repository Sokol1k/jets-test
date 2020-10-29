import { Model, Dialect } from 'sequelize'

export interface IDBConfig {
  readonly username: string,
  readonly password: string,
  readonly database: string,
  readonly host: string,
  readonly dialect: Dialect
}

export interface IUser extends Model {
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  avatar?: string,
  reset_link?: string
}

export interface IFile extends Model {
  user_id: number,
  path: string,
  type: string
}