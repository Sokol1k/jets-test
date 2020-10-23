import express from 'express'

import auth from '../components/auth.controller'

const router: express.Router = express.Router()

router.post('/auth/register', auth.register)

export default router