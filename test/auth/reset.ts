import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'

export default () => {
  describe('Reset password endpoint', () : void => {
    let resetLink

    beforeEach(async () => {
      await request(app)
      .post('/api/auth/register')
        .send({
            name: 'Danil',
            surname: 'Sokol',
            email: 'danil.sokolowskiy@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        })
      await request(app)
        .post('/api/auth/forget')
        .send({
            email: 'danil.sokolowskiy@gmail.com',
        })
      const user = await db.User.findOne({ where: {email: 'danil.sokolowskiy@gmail.com'}})
      resetLink = user.reset_link
    })

    it('restore password', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/reset')
        .send({
          resetLink: resetLink,
          newPassword: 'qwerty',
          confirmNewPassword: 'qwerty'
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).not.toBeUndefined()
    })

    it('should return an error that the validation failed', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/reset')
        .send({
          resetLink: '',
          newPassword: '',
          confirmNewPassword: ''
        })
      expect(res.statusCode).toEqual(422)
      expect(res.body.resetLink).not.toBeUndefined()
      expect(res.body.newPassword).not.toBeUndefined()
    })

    afterAll(async () : Promise<void> => {
      await db.User.destroy({
        where: {
          email: "danil.sokolowskiy@gmail.com"
        },
        force: true
      })
    })
  })
}