import { Request, Response } from 'express'
import db from '../database/index'
import Validator from '../validator'

interface iUpdate {
  name?: string | boolean,
  surname?: string | boolean,
  email?: string | boolean,
}

async function update(req : Request | any, res : Response, next : Function) : Promise<void> {
  const name : string | boolean = new Validator(req.body.name).min(2).max(255).required().showMessage()
  const surname : string | boolean = new Validator(req.body.surname).min(2).max(255).required().showMessage()
  const email : string | boolean = new Validator(req.body.email).email().required().showMessage()

  const result : iUpdate = {}

  if(name) { result.name = name }
  if(surname) { result.surname = surname }
  if(email) { result.email = email }

  if(Object.keys(result).length) {
    res.status(422).send(result)
  } else {

    if (!(req.user.email === req.body.email)) {
      const user = await db.User.findOne({ where: {email: req.body.email} })

      if (user) {
        res.status(403).send({
          email: 'This email is not free'
        })
        return
      }
    } else {
      next()
    }
  }
}

export default {
  update
}