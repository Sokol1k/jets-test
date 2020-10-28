import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'
import path from 'path'

export default () => {
  describe('Get all file endpoint', () : void => {
    let token, fileId

    beforeAll(async () : Promise<void> => {
      await request(app)
        .post('/api/auth/register')
        .send({
            name: 'User',
            surname: 'First',
            email: 'UserFirst@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        })
      const res : any = await request(app)
          .post('/api/auth/login')
          .send({
              email: 'UserFirst@gmail.com',
              password: '123456',
          })
      token = res.body.token

      await request(app)
        .post('/api/file')
        .set('Authorization', 'bearer ' + token)
        .set('Content-type', 'multipart/form-data')
        .attach('file',  path.join(__dirname, '../data/default.jpeg'))

      const file = await db.File.findOne({ where: { path: 'uploads/default.jpeg' }})
      fileId = file.id
    })

    it('should return all files', async () : Promise<void> => {
      const res : any = await request(app)
        .get('/api/file')
        .set('Authorization', 'bearer ' + token)

      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body)).toBeTruthy()
      expect(res.body.length).toEqual(1)
    })

    it('should return an error that the user is not authorized', async () : Promise<void> => {
      const res : any = await request(app)
        .get('/api/file')

      expect(res.statusCode).toEqual(401)
      expect(res.body.message).not.toBeUndefined()
    })

    afterAll(async () => {
      await request(app)
        .delete(`/api/file/${fileId}`)
        .set('Authorization', 'bearer ' + token)

      await db.User.destroy({
        where: {
          email: "UserFirst@gmail.com"
        },
        force: true
      })
    })
  })
}