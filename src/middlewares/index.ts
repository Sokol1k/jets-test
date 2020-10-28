import express from 'express'
import multer from 'multer'

import profile from './profile.middleware'
import file from './file.middleware'

import fs from 'fs'

const storageConfig = multer.diskStorage({
  destination: function (req : any, file, cb) {
    const path = `./uploads/${req.user.id}`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req, file, cb) =>{
    if (file.fieldname === 'file') {
      cb(null, file.originalname)
    } else {
      cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
    }
  }
})

const upload = multer({
  storage: storageConfig,
})

const router: express.Router = express.Router()

router.put('/profile', profile.update)
router.put('/profile/change-password', profile.changePassword)
router.post('/profile/avatar', upload.single('avatar'), profile.avatar)

router.post('/file', upload.single('file'), file.save)
router.delete('/file/:id', file.destroy)

export default router