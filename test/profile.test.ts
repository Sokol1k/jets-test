import request from 'supertest'
import app from '../src/index'

let token

beforeAll(async () : Promise<void> => {
  const res : any = await request(app)
      .post('/api/auth/login')
      .send({
          email: 'danil.sokolowskiy@gmail.com',
          password: '123456',
      })
  token = res.body.token
})

describe('Update profile endpoint', () : void => {
  it('should update profile', async () : Promise<void> => {
    const res : any = await request(app)
      .put('/api/profile')
      .set('Authorization', 'bearer ' + token)
      .send({
        name: 'Neli',
        surname: 'Sokol1k',
        email: 'danil.sokolowskiy@gmail.com'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).not.toBeUndefined()
  })
})