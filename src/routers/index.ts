import express from 'express'

import profile from '../components/profile.controller'
import file from '../components/file.controller'

const router: express.Router = express.Router()

router.get('/profile', profile.get)
router.put('/profile', profile.update)
router.put('/profile/change-password', profile.changePassword)
router.post('/profile/avatar', profile.avatar)

router.get('/file', file.getAll)
router.post('/file', file.save)
router.delete('/file/:id', file.destroy)

export default router