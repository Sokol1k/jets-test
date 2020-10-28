import { Request, Response } from 'express'
import Validator from '../helpers/validator'
import ValidatorFile from '../helpers/validatorFile'
import { IUpdateForMiddeware, IChangePasswordForMiddeware } from '../interfaces/profile.interface'
import fs from 'fs'

async function update(req : Request | any, res : Response, next : Function) : Promise<void> {
  const name : string | boolean = new Validator(req.body.name).min(2).max(255).required().showMessage()
  const surname : string | boolean = new Validator(req.body.surname).min(2).max(255).required().showMessage()
  const email : string | boolean = new Validator(req.body.email).email().required().showMessage()

  const result : IUpdateForMiddeware = {}

  if(name) { result.name = name }
  if(surname) { result.surname = surname }
  if(email) { result.email = email }

  if(Object.keys(result).length) {
    res.status(422).send(result)
  } else {
    next()
  }
}

async function changePassword(req : Request | any, res : Response, next : Function) : Promise<void> {
  const oldPassword : string | boolean = new Validator(req.body.oldPassword).min(6).max(255).required().showMessage()
  const newPassword : string | boolean = new Validator(req.body.newPassword).min(6).max(255).confirmPassword(req.body.confirmNewPassword).required().showMessage()

  const result : IChangePasswordForMiddeware = {}

  if(oldPassword) { result.oldPassword = oldPassword }
  if(newPassword) { result.newPassword = newPassword }

  if(Object.keys(result).length) {
    res.status(422).send(result)
  } else {
    next()
  }
}

async function avatar(req : Request | any, res : Response, next : Function) : Promise<void> {
  let avatar : string | boolean
  let result : { avatar? : string | boolean } = {}

  if (req.file) {
    avatar = new ValidatorFile(req.file).size(10).fileType(['image/png', 'image/jpeg']).showMessage()
    if(avatar) {
      result.avatar = avatar
      fs.unlinkSync(req.file.path)
    }
  } else if (req.body?.avatar !== 'null') {
    result.avatar = "The field must be a file or null"
  }

  if(Object.keys(result).length) {
    res.status(422).send(result)
  } else {
    next()
  }
}

export default {
  update,
  changePassword,
  avatar
}