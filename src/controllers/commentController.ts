import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { COMMENT_MESSAGES } from '~/constants/messages'
import { CommentReqBody } from '~/models/requests/Comment.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import commentService from '~/services/comment.service'

export const createCommentController = async (req: Request<ParamsDictionary, any, CommentReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await commentService.createComment({ user_id, payload: req.body })

  return res.status(200).json({
    message: COMMENT_MESSAGES.CREATE_COMMENT_SUCCESS,
    result
  })
}

export const getCommentsController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const { blog_id } = req.params
  const result = await commentService.getCommentsByBlogId({ blog_id, limit, page })

  return res.status(200).json({
    message: COMMENT_MESSAGES.GET_COMMENT_SUCCESS,
    result
  })
}

export const replyCommentController = async (req: Request<ParamsDictionary, any, CommentReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await commentService.replyComment({ user_id, payload: req.body })

  return res.status(200).json({
    message: COMMENT_MESSAGES.REPLY_COMMENT_SUCCESS,
    result
  })
}
