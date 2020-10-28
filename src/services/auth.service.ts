import db from '../database/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "config"
import { Sequelize } from 'sequelize/types'
import nodemailer, { Transporter } from 'nodemailer'
import { ErrorHandler } from '../helpers/error'
import { IRegister, ILogin, IForget, IReset } from '../interfaces/auth.interface'

async function register(data: IRegister) : Promise<Sequelize> {
  try {
    const user = await db.User.findOne({ where: { email: data.email } })

    if (user) {
      throw new ErrorHandler(403, {
        email: 'This email is not free'
      })
    }

    data.password = await bcrypt.hash(data.password, 12)
    return await db.User.create(data)
  } catch (error) {
    throw error
  }
}

async function login(data: ILogin) : Promise<{ token : string }> {
  try {
    const user = await db.User.findOne({ where: {email: data.email} })

    if (!user) {
      throw new ErrorHandler(403, {
        message: "Invalid login information!"
      })
    }

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new ErrorHandler(403, {
        message: "Invalid login information!"
      })
    }

    return {
      token: jwt.sign({ id: user.id, email: user.email }, config.get('jwtSecret'), { expiresIn: '1d' })
    }
  } catch (error) {
    throw error
  }
}

async function forget(data: IForget) : Promise<void> {
  try {
    const user = await db.User.findOne({ where: {email: data.email} })

    if (!user) {
      throw new ErrorHandler(403, {
        message: "No such email exists"
      })
    }

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

async function reset(data: IReset) : Promise<void> {
  try {
    const decoded: any = jwt.verify(data.resetLink, config.get('resetSecret'))
    await db.User.update({
      password: await bcrypt.hash(data.newPassword, 12),
      reset_link: ''
    }, {
      where: {
        id: decoded.id
      }
    })
  } catch(error) {
    throw error
  }
}

export default {
  register,
  login,
  forget,
  reset
}