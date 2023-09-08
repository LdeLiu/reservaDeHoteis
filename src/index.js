import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { Database } from './database/Database.js'
import { userRouter } from './routers/userRouter.js'
import { hotelRouter } from './routers/hotelRouter.js'
import { reserveRouter } from './routers/reserveRouter.js'
import { AuthMiddleware } from './middleware/AuthMiddleware.js'

Database.initialize()

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(AuthMiddleware.handle)
app.use(hotelRouter)
app.use(reserveRouter)

app.listen(process.env.PORT, () => console.log('server runnin at ' + process.env.PORT))