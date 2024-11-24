import { Router } from 'express'
import {
  blogController,
  getBlogByBlogIdController,
  getBlogByUserIdController,
  getBlogsController
} from '~/controllers/blogController'
import { blogValidator } from '~/middlewares/blog.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const blogRouter = Router()

blogRouter.post(
  '/create',
  accessTokenValidator,
  verifiedUserValidator,
  blogValidator,
  wrapRequestHandler(blogController)
)

blogRouter.get('/list', wrapRequestHandler(getBlogsController))

blogRouter.get('/blog_id/:blog_id', wrapRequestHandler(getBlogByBlogIdController))

blogRouter.get('/user_id/:user_id', wrapRequestHandler(getBlogByUserIdController))

export default blogRouter
