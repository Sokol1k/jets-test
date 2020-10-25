import express from 'express'
import multer from 'multer'

import profile from './profile.middleware'

const storageConfig = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) =>{
    cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
  }
})

const upload = multer({
  storage: storageConfig,
})

const router: express.Router = express.Router()

router.put('/profile', profile.update)
router.put('/profile/change-password', profile.changePassword)
router.post('/profile/avatar', upload.single('avatar'), profile.avatar)

export default router