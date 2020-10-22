import { Request, Response } from 'express'
import User from '../services/auth.service'

async function register(req : Request, res : Response) : Promise<void> {
  try {
    const data =  await User.createUser(req.body)
    res.status(201).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  register
}