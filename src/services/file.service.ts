import db from '../database/index'
import fs from 'fs'
import { IFile } from "../interfaces/database.interface";

async function getAll(id: number) : Promise<IFile[]> {
  try {
    return db.File.findAll({ where: { user_id: id }})
  } catch(error) {
    throw error
  }
}

async function save(id: number, file: any) : Promise<void> {
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

async function destroy(id: number) : Promise<void> {
  try {
    const file = await db.File.findByPk(id)
    if (file) {
      fs.unlinkSync(file.path)
      await file.destroy({
        force: true
      })
    }
  } catch(error) {
    throw error
  }
}

export default {
  getAll,
  save,
  destroy
}