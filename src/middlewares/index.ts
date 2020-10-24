import express from 'express'

import auth from './auth.middleware'

const router: express.Router = express.Router()

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)
router.post('/auth/forget', auth.forget)
router.post('/auth/reset', auth.reset)

export default router