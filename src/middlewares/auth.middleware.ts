import { Request, Response } from 'express'
import Validator from '../helpers/validator'
import { IAuthValidator } from '../interfaces/auth.interface'

async function register (req : Request, res : Response, next : Function) : Promise<void> {
  try {

    const name : string | boolean = new Validator(req.body.name).min(2).max(255).required().showMessage()
    const surname : string | boolean = new Validator(req.body.surname).min(2).max(255).required().showMessage()
    const email : string | boolean = new Validator(req.body.email).email().required().showMessage()
    const password : string | boolean = new Validator(req.body.password).min(6).max(255).confirmPassword(req.body.confirmPassword).required().showMessage()

    const result : IAuthValidator = {}

    if(name) { result.name = name }
    if(surname) { result.surname = surname }
    if(email) { result.email = email }
    if(password) { result.password = password }

    if(Object.keys(result).length) {
      res.status(422).send(result)
    } else {
      next()
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

async function login (req : Request, res : Response, next : Function) : Promise<void> {
  try {
    const email : string | boolean = new Validator(req.body.email).email().required().showMessage()
    const password : string | boolean = new Validator(req.body.password).min(6).max(255).required().showMessage()

    const result : IAuthValidator = {}

    if(email) { result.email = email }
    if(password) { result.password = password }

    if(Object.keys(result).length) {
      res.status(422).send(result)
    } else {
      next()
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

async function forget (req : Request, res : Response, next : Function) : Promise<void> {
  try {
    const email : string | boolean = new Validator(req.body.email).email().required().showMessage()

    const result : IAuthValidator = {}

    if(email) { result.email = email }

    if(Object.keys(result).length) {
      res.status(422).send(result)
    } else {
      next()
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

async function reset (req : Request, res : Response, next : Function) : Promise<void> {
  try {
    const resetLink : string | boolean = new Validator(req.body.resetLink).required().showMessage()
    const newPassword : string | boolean = new Validator(req.body.newPassword).min(6).max(255).confirmPassword(req.body.confirmNewPassword).required().showMessage()

    const result : IAuthValidator = {}

    if(resetLink) { result.resetLink = resetLink }
    if(newPassword) { result.newPassword = newPassword }

    if(Object.keys(result).length) {
      res.status(422).send(result)
    } else {
      next()
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  register,
  login,
  forget,
  reset
}