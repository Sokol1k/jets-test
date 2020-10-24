import { Request, Response } from 'express'
import db from '../database/index'
import bcrypt from 'bcryptjs'
import Validator from '../validator'

interface iAuthValidator {
  name?: string | boolean,
  surname?: string | boolean,
  email?: string | boolean,
  password?: string | boolean,
  resetLink?: string | boolean,
  newPassword?: string | boolean
}

async function register (req : Request, res : Response, next : Function) : Promise<void> {
  try {

    const user = await db.User.findOne({ where: {email: req.body.email} })

    const name : string | boolean = new Validator(req.body.name).min(2).max(255).required().showMessage()
    const surname : string | boolean = new Validator(req.body.surname).min(2).max(255).required().showMessage()
    const email : string | boolean = new Validator(req.body.email).email().required().showMessage()
    const password : string | boolean = new Validator(req.body.password).min(6).max(255).confirmPassword(req.body.confirmPassword).required().showMessage()

    const result : iAuthValidator = {}

    if(name) { result.name = name }
    if(surname) { result.surname = surname }
    if(email) { result.email = email }
    if(password) { result.password = password }

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
  } catch (error) {
    res.status(500).send(error)
  }
}

async function login (req : Request, res : Response, next : Function) : Promise<void> {
  try {
    const email : string | boolean = new Validator(req.body.email).email().required().showMessage()
    const password : string | boolean = new Validator(req.body.password).min(6).max(255).required().showMessage()

    const result : iAuthValidator = {}

    if(email) { result.email = email }

    if(password) { result.password = password }

    if(Object.keys(result).length) {
      res.status(422).send(result)
    } else {
      const user = await db.User.findOne({ where: {email: req.body.email} })

      if (!user) {
        res.status(403).send({
          message: "Invalid login information!"
        })
        return
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password)

      if (!isMatch) {
        res.status(403).send({
          message: "Invalid login information!"
        })
        return
      }

      next()
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

async function forget (req : Request, res : Response, next : Function) : Promise<void> {
  try {
    const email : string | boolean = new Validator(req.body.email).email().required().showMessage()

    const result : iAuthValidator = {}

    if(email) { result.email = email }

    if(Object.keys(result).length) {
      res.status(422).send(result)
    } else {
      const user = await db.User.findOne({ where: {email: req.body.email} })

      if (!user) {
        res.status(403).send({
          message: "No such email exists"
        })
        return
      }

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

    const result : iAuthValidator = {}

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