import express from 'express'

import profile from './profile.middleware'

const router: express.Router = express.Router()

router.put('/profile', profile.update)
router.put('/profile/change-password', profile.changePassword)

export default router