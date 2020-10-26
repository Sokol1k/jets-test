import { Request, Response } from 'express'
import File from '../services/file.service'

async function save(req : Request | any, res : Response) : Promise<void> {
  try {
    await File.save(req.user.id, req.file)
    res.status(200).send({
      message: 'The file was saved successfully'
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  save
}