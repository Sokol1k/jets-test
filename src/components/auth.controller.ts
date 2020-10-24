import { Request, Response } from 'express'
import User from '../services/auth.service'

async function register(req : Request, res : Response) : Promise<void> {
  try {
    await User.createUser(req.body)
    res.status(201).send({
      message: 'User has been registered!'
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

async function login(req : Request, res : Response) : Promise<void> {
  try {
    const data = await User.login(req.body)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

async function forget(req : Request, res : Response) : Promise<void> {
  try {
    await User.forget(req.body)
    res.status(200).send({
      message: 'A message has been sent to the mail to reset your password'
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  register,
  login,
  forget
}