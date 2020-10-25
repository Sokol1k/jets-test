import db from '../database/index'

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

export default {
  update
}