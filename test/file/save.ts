import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'
import path from 'path'

export default () => {
  describe('Save endpoint', () : void => {
    let token

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
    })

    it('should save file', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/file')
        .set('Authorization', 'bearer ' + token)
        .set('Content-type', 'multipart/form-data')
        .attach('file',  path.join(__dirname, '../data/default.jpeg'))

      expect(res.statusCode).toEqual(200)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error, the field should contain a file', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/file')
        .set('Authorization', 'bearer ' + token)

      expect(res.statusCode).toEqual(422)
      expect(res.body.file).not.toBeUndefined()
    })

    afterAll(async () => {
      await db.File.destroy({
        where: {
          path: "uploads/default.jpeg"
        },
        force: true
      })
      await db.User.destroy({
        where: {
          email: "UserFirst@gmail.com"
        },
        force: true
      })
    })
  })
}