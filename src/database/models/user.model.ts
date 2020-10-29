import { Sequelize, STRING } from "sequelize"
import { IUser } from "../../interfaces/database.interface";

export default (sequelize : Sequelize) => {
  const User = sequelize.define<IUser>('user', {
    name: {
      type: STRING
    },
    surname: {
      type: STRING
    },
    email: {
      type: STRING
    },
    password: {
      type: STRING
    },
    avatar: {
      type: STRING,
      defaultValue: null
    },
    reset_link: {
      type: STRING,
      defaultValue: null
    }
  })

  return User
}