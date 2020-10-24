export default (sequelize : any, Sequelize : any) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    reset_link: {
      type: Sequelize.STRING,
      default: ''
    }
  })

  return User
}