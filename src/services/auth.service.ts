import db from '../database/index'
import bcrypt from 'bcryptjs'

interface iCreateUser {
  readonly name: string,
  readonly surname: string,
  readonly email: string,
  password: string,
  readonly confirm_password: string
}

async function createUser(data: iCreateUser) {
  data.password = await bcrypt.hash(data.password, 12)
  return await db.User.create(data)
}

export default {
  createUser
}