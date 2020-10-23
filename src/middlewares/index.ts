import express from 'express'

import auth from './auth.middleware'

const router: express.Router = express.Router()

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

export default router