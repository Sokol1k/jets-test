import { Request, Response } from 'express'
import Profile from '../services/profile.service'

async function update(req : Request | any, res : Response) : Promise<void> {
  try {
    await Profile.update(req.user.id, req.body)
    res.status(200).send({
      message: 'Profile updated successfully'
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

async function changePassword(req : Request | any, res : Response) : Promise<void> {
  try {
    await Profile.changePassword(req.user.id, req.body.newPassword)
    res.status(200).send({
      message: 'Password changed successfully'
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  update,
  changePassword
}