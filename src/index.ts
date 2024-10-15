import dotenv from 'dotenv'
import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import categoryRouter from './routes/category.routes'
import mediasRouter from './routes/medias.routes'
dotenv.config()

databaseService.connect().then(() => {
  //   databaseService.indexUsers()
  //   databaseService.indexRefreshTokens()
  //   databaseService.indexFollowers()
})

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

// middlewares
app.use('/users', usersRouter)
app.use('/category', categoryRouter)
app.use('/medias', mediasRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
