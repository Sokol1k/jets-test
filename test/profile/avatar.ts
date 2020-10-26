import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'
import path from 'path'

export default () => {
  describe('Avatar endpoint', () : void => {
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

    it('should save avatar', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/profile/avatar')
        .set('Authorization', 'bearer ' + token)
        .set('Content-type', 'multipart/form-data')
        .attach('avatar',  path.join(__dirname, '../data/default.jpeg'))

      expect(res.statusCode).toEqual(200)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error that the file size is greater than the limit', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/profile/avatar')
        .set('Authorization', 'bearer ' + token)
        .set('Content-type', 'multipart/form-data')
        .attach('avatar',  path.join(__dirname, '../data/size.png'))

      expect(res.statusCode).toEqual(422)
      expect(res.body.avatar).not.toBeUndefined()
    })

    it('should return an error that the file type is wrong', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/profile/avatar')
        .set('Authorization', 'bearer ' + token)
        .set('Content-type', 'multipart/form-data')
        .attach('avatar',   path.join(__dirname, '../data/type.txt'))

      expect(res.statusCode).toEqual(422)
      expect(res.body.avatar).not.toBeUndefined()
    })

    it('should remove avatar', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/profile/avatar')
        .set('Authorization', 'bearer ' + token)
        .set('Content-type', 'multipart/form-data')
        .field('avatar', 'null')

      expect(res.statusCode).toEqual(200)
      expect(res.body.message).not.toBeUndefined()
    })

    afterAll(async () => {
      await db.User.destroy({
        where: {
          email: "UserFirst@gmail.com"
        },
        force: true
      })
    })
  })
}