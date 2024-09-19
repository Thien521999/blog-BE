import dotenv from 'dotenv'
import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
dotenv.config()

databaseService.connect().then(() => {
  //   databaseService.indexUsers()
  //   databaseService.indexRefreshTokens()
  //   databaseService.indexFollowers()
})

const app = express()

const port = process.env.PORT || 4000

// app.use(express.json())

// middlewares
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
