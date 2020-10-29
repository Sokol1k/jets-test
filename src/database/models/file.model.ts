import { Sequelize, INTEGER, STRING } from "sequelize"
import { IFile } from "../../interfaces/database.interface"

export default (sequelize : Sequelize) => {
  const File = sequelize.define<IFile>('file', {
    user_id: {
      type: INTEGER
    },
    path: {
      type: STRING
    },
    type: {
      type: STRING
    }
  })

  return File
}