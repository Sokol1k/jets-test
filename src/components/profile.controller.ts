import { Request, Response } from 'express'
import Profile from '../services/profile.service'
import { handleError } from '../helpers/error'

async function update(req : Request | any, res : Response) : Promise<void> {
  try {
    await Profile.update(req.user.id,  { ...req.body, currentEmail: req.user.email })
    res.status(200).send({
      message: 'Profile updated successfully'
    })
  } catch (error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

async function changePassword(req : Request | any, res : Response) : Promise<void> {
  try {
    await Profile.changePassword(req.user.id, req.body)
    res.status(200).send({
      message: 'Password changed successfully'
    })
  } catch (error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

async function avatar(req : Request | any, res : Response) : Promise<void> {
  try {
    const avatar : string = req.file?.path || req.body?.avatar === 'null' && null
    await Profile.avatar(req.user.id, avatar)
    res.status(200).send({
      message: avatar ? 'The avatar was saved successfully' : 'The avatar has been successfully deleted'
    })
  } catch (error) {
    error.statusCode ? handleError(error, res) : res.status(500).send(error)
  }
}

export default {
  update,
  changePassword,
  avatar
}