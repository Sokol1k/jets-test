import express from 'express'

import profile from './profile.middleware'

const router: express.Router = express.Router()

router.put('/profile', profile.update)

export default router