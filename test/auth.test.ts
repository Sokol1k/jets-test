import request from 'supertest'
import app from '../src/index'
import db from '../src/database/index'

beforeAll(async () : Promise<void> => {
  await db.User.destroy({
    where: {
      email: "danil.sokolowskiy@gmail.com"
    },
    force: true
  })
})

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
})

describe('Login endpoint', () : void => {
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
})

describe('Forget password endpoint', () : void => {
  it('should send a message to the mail for reset password', async () : Promise<void> => {
    const res : any = await request(app)
      .post('/api/auth/forget')
      .send({
          email: 'danil.sokolowskiy@gmail.com',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).not.toBeUndefined()
  }),
  it('should return an error that the email is incorrect', async () : Promise<void> => {
    const res : any = await request(app)
      .post('/api/auth/forget')
      .send({
          email: 'danil.sokolowskiy+1@gmail.com',
      })
    expect(res.statusCode).toEqual(403)
    expect(res.body.message).not.toBeUndefined()
  }),
  it('should return an error that the validation failed', async () : Promise<void> => {
    const res : any = await request(app)
      .post('/api/auth/forget')
      .send({
          email: '',
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body.email).not.toBeUndefined()
  })
})

describe('Reset password endpoint', () : void => {
  let resetLink

  beforeEach(async () => {
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
})