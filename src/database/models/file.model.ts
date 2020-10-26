export default (sequelize : any, Sequelize : any) => {
  const File = sequelize.define('file', {
    user_id: {
      type: Sequelize.INTEGER
    },
    path: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  })

  return File
}