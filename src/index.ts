import { resolve } from "path"
import { config } from "dotenv"
import express from 'express'
import db from './database/index'

import router from './routers'

config({ path: resolve(__dirname, '../.env')})

const app: express.Application = express()
const PORT: string | number = process.env.PORT || 3000

app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});

export default app