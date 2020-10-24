import db from '../database/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "config"
import { Sequelize } from 'sequelize/types'
import nodemailer, { Transporter } from 'nodemailer'

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

interface iForget {
  readonly email: string,
}

async function createUser(data: iCreateUser) : Promise<Sequelize> {
  try {
    data.password = await bcrypt.hash(data.password, 12)
    return await db.User.create(data)
  } catch (error) {
    throw error
  }
}

async function login(data: iLogin) : Promise<{ token : string }> {
  try {
    const user = await db.User.findOne({ where: {email: data.email} })
    return {
      token: jwt.sign({ user }, config.get('jwtSecret'), { expiresIn: '1d' })
    }
  } catch (error) {
    throw error
  }
}

async function forget(data: iForget) : Promise<void> {
  try {
    const user = await db.User.findOne({ where: {email: data.email} })
    const token : string = jwt.sign({ id: user.id }, config.get('resetSecret'), { expiresIn: '20m' })
    const transporter : Transporter = nodemailer.createTransport(config.get('mail'))
    await transporter.sendMail({
      from: '<danil.sokolovskyi@computools.com>',
      to: data.email,
      subject: 'Reset Password',
      html: `
        ${config.get('url')}/reset/${token}
      `
    })
    user.update({reset_link: token})
  } catch (error) {
    throw error
  }
}

export default {
  createUser,
  login,
  forget
}