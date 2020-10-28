import { Request, Response } from 'express'
import File from '../services/file.service'

async function getAll(req : Request | any, res : Response) : Promise<void> {
  try {
    const data = await File.getAll(req.user.id)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

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

async function destroy(req : Request | any, res : Response) : Promise<void> {
  try {
    await File.destroy(req.params.id)
    res.status(200).send({
      message: 'File deleted successfully.'
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  getAll,
  save,
  destroy
}