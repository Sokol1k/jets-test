import db from '../database/index'

async function save(id: number, file: any) {
  try {
    await db.File.create({
      user_id: id,
      path: file.path,
      type: file.mimetype
    })
  } catch(error) {
    throw error
  }
}

export default {
  save
}