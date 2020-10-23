import db from '../database/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "config"

interface iCreateUser {
  readonly name: string,
  readonly surname: string,
  readonly email: string,
  password: string,
  readonly confirm_password: string
}

interface iLogin {
  readonly email: string,
  readonly password: string,
}

async function createUser(data: iCreateUser) {
  data.password = await bcrypt.hash(data.password, 12)
  return await db.User.create(data)
}

async function login(data: iLogin) {
  const user = await db.User.findOne({ where: {email: data.email} })
  return { 
    token: jwt.sign(
      { user },
      config.get('jwtSecret'),
      { expiresIn: '1d' }
    )
  }
}

export default {
  createUser,
  login
}