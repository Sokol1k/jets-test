import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'

export default () => {
  describe('Login endpoint', () : void => {
    beforeAll(async () : Promise<void> => {
      await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Danil',
            surname: 'Sokol',
            email: 'danil.sokolowskiy@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        })
    })

    it('should authorize the user', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'danil.sokolowskiy@gmail.com',
            password: '123456',
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.token).not.toBeUndefined()
    }),

    it('should return an error that the login or password is incorrect', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'danil.sokolowskiy+1@gmail.com',
            password: '123456',
        })
      expect(res.statusCode).toEqual(403)
      expect(res.body.message).not.toBeUndefined()
    }),

    it('should return an error that the validation failed', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/login')
        .send({
            email: '',
            password: '',
        })
      expect(res.statusCode).toEqual(422)
      expect(res.body.email).not.toBeUndefined()
      expect(res.body.password).not.toBeUndefined()
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