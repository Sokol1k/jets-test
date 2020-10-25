import express from 'express'

import profile from '../components/profile.controller'

const router: express.Router = express.Router()

router.put('/profile', profile.update)

export default router