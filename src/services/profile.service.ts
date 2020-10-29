import db from '../database/index'
import bcrypt from 'bcryptjs'
import { ErrorHandler } from '../helpers/error'
import config from 'config'
import { IUpdateForService, IChangePasswordForService } from '../interfaces/profile.interface'
import { IUser } from "../interfaces/database.interface";
import fs from 'fs'

async function get(id: number) : Promise<IUser | void> {
  try {
    const data = await db.User.findByPk(id, {
      attributes: ['name', 'surname', 'email', 'avatar']
    })
    if (data) {
      data.avatar = data.avatar && `${config.get('url')}/${data.avatar}`
      return data
    }
  } catch (error) {
    throw error
  }
}

async function update(id : number, data : IUpdateForService) : Promise<void> {
  try {
    if (!(data.email === data.currentEmail)) {
      const user = await db.User.findOne({ where: {email: data.email} })

      if (user) {
        throw new ErrorHandler(403, {
          email: 'This email is not free'
        })
      }
    }
    await db.User.update(data, { where: { id } })
  } catch(error) {
    throw error
  }
}

async function changePassword(id : number, data : IChangePasswordForService) : Promise<void> {
  try {
    const user = await db.User.findByPk(id)

    if(user) {
      const isMatch = await bcrypt.compare(data.oldPassword, user.password)

      if (!isMatch) {
        throw new ErrorHandler(403, {
          oldPassword: 'Incorrect password'
        })
      }

      const password = await bcrypt.hash(data.newPassword, 12)
      await user.update({ password })
    }
  } catch(error) {
    throw error
  }
}

async function avatar(id : number, avatar : string) : Promise<void> {
  try {
    const user = await db.User.findByPk(id)
    if (user) {
      if (user.avatar && !avatar) {
        fs.unlinkSync(user.avatar)
      }
      await user.update({ avatar })
    }
  } catch(error) {
    throw error
  }
}

export default {
  get,
  update,
  changePassword,
  avatar
}