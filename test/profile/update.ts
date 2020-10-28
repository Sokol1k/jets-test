import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'

export default () => {
  describe('Update profile endpoint', () : void => {
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
      await request(app)
        .post('/api/auth/register')
        .send({
            name: 'User',
            surname: 'Second',
            email: 'UserSecond@gmail.com',
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

    it('should update profile', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile')
        .set('Authorization', 'bearer ' + token)
        .send({
          name: 'User1',
          surname: 'First1',
          email: 'UserFirst@gmail.com'
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error that the user is not authorized', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile')

      expect(res.statusCode).toEqual(401)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error that email is not free', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile')
        .set('Authorization', 'bearer ' + token)
        .send({
          name: 'User1',
          surname: 'First1',
          email: 'UserSecond@gmail.com'
        })
      expect(res.statusCode).toEqual(403)
      expect(res.body.email).not.toBeUndefined()
    })

    it('should return an error that the validation failed', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile')
        .set('Authorization', 'bearer ' + token)
        .send({
          name: '',
          surname: '',
          email: ''
        })
      expect(res.statusCode).toEqual(422)
      expect(res.body.name).not.toBeUndefined()
      expect(res.body.surname).not.toBeUndefined()
      expect(res.body.email).not.toBeUndefined()
    })

    afterAll(async () => {
      await db.User.destroy({
        where: {
          email: ["UserFirst@gmail.com", "UserSecond@gmail.com"]
        },
        force: true
      })
    })
  })
}