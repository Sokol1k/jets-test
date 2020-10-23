import request from 'supertest'
import app from '../src/index'

describe('Authorization endpoint', () : void => {
  it('should create a new user', async () : Promise<void> => {
    const res : any = await request(app)
      .post('/api/auth/register')
      .send({
          name: 'Bob',
          surname: 'Jones',
          email: 'bob@gmail.com',
          password: '123456',
          confirm_password: '123456'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).not.toBeUndefined()
  }),
  it('should return an error that email is not free', async () : Promise<void> => {
    const res : any = await request(app)
      .post('/api/auth/register')
      .send({
          name: 'Bob',
          surname: 'Jones',
          email: 'bob@gmail.com',
          password: '123456',
          confirm_password: '123456'
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
          confirm_password: ''
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body.name).not.toBeUndefined()
    expect(res.body.surname).not.toBeUndefined()
    expect(res.body.email).not.toBeUndefined()
    expect(res.body.password).not.toBeUndefined()
  })
})