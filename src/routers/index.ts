import express from 'express'

import verifyToken from '../middlewares/verifyToken'
import auth from '../components/auth.controller'

const router: express.Router = express.Router()

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)
router.post('/auth/forget', auth.forget)
router.post('/auth/reset', auth.reset)

router.use(verifyToken)

export default router