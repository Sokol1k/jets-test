import request from 'supertest'
import app from '../../src/index'
import db from '../../src/database/index'

export default () => {
  describe('Register endpoint', () : void => {
    it('should create a new user', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Danil',
            surname: 'Sokol',
            email: 'danil.sokolowskiy@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body.message).not.toBeUndefined()
    }),

    it('should return an error that email is not free', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Danil',
            surname: 'Sokol',
            email: 'danil.sokolowskiy@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        })
      expect(res.statusCode).toEqual(403)
      expect(res.body.email).not.toBeUndefined()
    }),

    it('should return an error that the validation failed', async () : Promise<void> => {
      const res : any = await request(app)
        .post('/api/auth/register')
        .send({
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
      expect(res.statusCode).toEqual(422)
      expect(res.body.name).not.toBeUndefined()
      expect(res.body.surname).not.toBeUndefined()
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