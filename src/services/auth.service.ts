import db from '../database/index'

async function createUser(data: any) {
  return await db.User.create(data)
}

export default {
  createUser
}