import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'

export default () => {
  describe('Change password endpoint', () : void => {
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

    it('should change the password', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile/change-password')
        .set('Authorization', 'bearer ' + token)
        .send({
          oldPassword: "123456",
          newPassword: "qwerty",
          confirmNewPassword: "qwerty"
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error that the user is not authorized', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile/change-password')

      expect(res.statusCode).toEqual(401)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error that the old password is incorrect', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile/change-password')
        .set('Authorization', 'bearer ' + token)
        .send({
          oldPassword: "123456",
          newPassword: "qwerty",
          confirmNewPassword: "qwerty"
        })
      expect(res.statusCode).toEqual(403)
      expect(res.body.oldPassword).not.toBeUndefined()
    })

    it('should return an error that the validation failed', async () : Promise<void> => {
      const res : any = await request(app)
        .put('/api/profile/change-password')
        .set('Authorization', 'bearer ' + token)
        .send({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        })
      expect(res.statusCode).toEqual(422)
      expect(res.body.oldPassword).not.toBeUndefined()
      expect(res.body.newPassword).not.toBeUndefined()
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