import dotenv from 'dotenv'
import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import categoryRouter from './routes/category.routes'
import mediasRouter from './routes/medias.routes'
import blogRouter from './routes/blog.router'
import commentRouter from './routes/comment.routes'
dotenv.config()

databaseService.connect().then(() => {
  // index khi connect DB xong
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexCategory()
})

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

// middlewares
app.use('/users', usersRouter)
app.use('/category', categoryRouter)
app.use('/medias', mediasRouter)
app.use('/blog', blogRouter)
app.use('/comment', commentRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
