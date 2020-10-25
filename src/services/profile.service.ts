import db from '../database/index'
import bcrypt from 'bcryptjs'
import fs from 'fs'

interface iUpdate {
  readonly name: string,
  readonly surname: string,
  readonly email: string,
}

async function update(id : number, data : iUpdate) : Promise<void> {
  try {
    await db.User.update(data, { where: { id } })
  } catch(error) {
    throw error
  }
}

async function changePassword(id : number, newPassword : string) : Promise<void> {
  try {
    const password = await bcrypt.hash(newPassword, 12)
    await db.User.update({ password }, { where: { id } })
  } catch(error) {
    throw error
  }
}

async function avatar(id : number, avatar : string) : Promise<void> {
  try {
    const user = await db.User.findByPk(id)
    if (user.avatar && !avatar) {
      fs.unlinkSync(user.avatar)
    }
    await user.update({ avatar })
  } catch(error) {
    throw error
  }
}

export default {
  update,
  changePassword,
  avatar
}