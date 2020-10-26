import { Request, Response } from 'express'
import ValidatorFile from '../helpers/validatorFile'
import fs from 'fs'

async function save (req : Request | any, res : Response, next : Function) : Promise<void> {
  const file = new ValidatorFile(req.file).size(500).required().showMessage()

  if(file && req.file) {
    fs.unlinkSync(req.file.path)
  }

  if(file) {
    res.status(422).send({file})
  } else {
    next()
  }
}

export default {
  save
}