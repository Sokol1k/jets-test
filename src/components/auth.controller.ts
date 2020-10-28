import { Request, Response } from 'express'
import User from '../services/auth.service'
import { handleError } from '../helpers/error'

async function register(req : Request, res : Response) : Promise<void> {
  try {
    await User.register(req.body)
    res.status(201).send({
      message: 'User has been registered!'
    })
  } catch (error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

async function login(req : Request, res : Response) : Promise<void> {
  try {
    const data = await User.login(req.body)
    res.status(200).send(data)
  } catch (error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

async function forget(req : Request, res : Response) : Promise<void> {
  try {
    await User.forget(req.body)
    res.status(200).send({
      message: 'A message has been sent to the mail to reset your password'
    })
  } catch (error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

async function reset(req : Request, res : Response) : Promise<void> {
  try {
    await User.reset(req.body)
    res.status(200).send({
      message: 'Password changed successfully'
    })
  } catch(error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

export default {
  register,
  login,
  forget,
  reset
}