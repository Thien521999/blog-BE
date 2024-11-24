import { Router } from 'express'
import { createCommentController, getCommentsController, replyCommentController } from '~/controllers/commentController'
import { commentValidator } from '~/middlewares/comment.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const commentRouter = Router()

commentRouter.post(
  '/create',
  accessTokenValidator,
  verifiedUserValidator,
  commentValidator,
  wrapRequestHandler(createCommentController)
)

commentRouter.get(
  '/blog/:blog_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getCommentsController)
)

commentRouter.post(
  '/reply_comment',
  accessTokenValidator,
  verifiedUserValidator,
  // commentValidator,
  wrapRequestHandler(replyCommentController)
)

export default commentRouter
