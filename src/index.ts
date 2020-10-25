import config from "config"
import express from 'express'

import authMiddleware from './middlewares/auth'
import authRouter from './routers/auth'

import verifyToken from './middlewares/verifyToken'

import middleware from './middlewares'
import router from './routers'

const app: express.Application = express()
const PORT: number = config.get('port') || 3000

app.use(express.json())

app.use('/api', authMiddleware)
app.use('/api', authRouter)

app.use(verifyToken)

app.use('/api', middleware)
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});

export default app