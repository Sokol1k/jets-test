import { Request, Response } from 'express'
import db from '../database/index'
import Validator from '../validator'

interface iRegisterValidator {
  name?: string | boolean,
  surname?: string | boolean,
  email?: string | boolean,
  password?: string | boolean
}

async function register(req : Request, res : Response, next : Function) : Promise<void> {

  const user = await db.User.findOne({ where: {email: req.body.email} })

  const name : string | boolean = new Validator(req.body.name).min(2).max(255).required().showMessage()
  const surname : string | boolean = new Validator(req.body.surname).min(2).max(255).required().showMessage()
  const email : string | boolean = new Validator(req.body.email).email().required().showMessage()
  const password : string | boolean = new Validator(req.body.password).min(6).max(255).confirmPassword(req.body.confirm_password).required().showMessage()

  const result : iRegisterValidator = {}

  if(name) {
    result.name = name
  }

  if(surname) {
    result.surname = surname
  }

  if(email) {
    result.email = email
  }

  if(password) {
    result.password = password
  }

  if(Object.keys(result).length) {
    res.status(422).send(result)
  } else {

    if (user) {
      res.status(403).send({
        email: 'This email is not free'
      })
      return
    } else {
      next()
    }
  }
}

export default {
  register
}