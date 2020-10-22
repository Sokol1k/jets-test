import request from 'supertest'
import app from '../src/index'

describe('Authorization endpoint', () : void => {
  it('should create a new user', async () : Promise<void> => {
    const res : request.SuperTest<request.Test> = await request(app)
      .post('/auth/registration')
      .send({
          name: 'Bob',
          surname: 'Jones',
          email: 'bob@gmail.com',
          password: '12345',
          confirm_password: '12345'
      })
    expect(res.statusCode).toEqual(201)
  })
})