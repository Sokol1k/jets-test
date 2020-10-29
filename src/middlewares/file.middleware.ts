import { Request, Response } from 'express'
import ValidatorFile from '../helpers/validatorFile'
import db from '../database/index'
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

async function destroy (req : Request | any, res : Response, next : Function) : Promise<void> {
  const file = await db.File.findByPk(req.params.id)
  if(!file) {
    res.status(422).send({
      message: 'The file by the given id does not exist'
    })
  } else {
    if (req.user.id !== file.user_id) {
      res.status(422).send({
        message: 'The file by the given id does not exist'
      })
    } else {
      next()
    }
  }
}

export default {
  save,
  destroy
}