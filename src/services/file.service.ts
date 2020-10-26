import db from '../database/index'
import fs from 'fs'

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

async function destroy(id: number) {
  try {
    const file = await db.File.findByPk(id)
    fs.unlinkSync(file.path)
    await file.destroy({
      force: true
    })
  } catch(error) {
    throw error
  }
}

export default {
  save,
  destroy
}