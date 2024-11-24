import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { BlogReqBody } from '~/models/requests/Blog.request'
import { TokenPayload } from '~/models/requests/User.requests'
import blogService from '~/services/blogService'
import { BLOG_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import HTTP_STATUS from '~/constants/httpStatus'
import { ObjectId } from 'mongodb'

export const blogController = async (req: Request<ParamsDictionary, any, BlogReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await blogService.createBlog({ user_id, payload: req.body })

  return res.status(200).json(result)
}

export const getBlogsController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const { blogs, total } = await blogService.getHomeBlogs({ limit, page })
  return res.status(200).json({
    blogs,
    limit,
    page,
    total_page: Math.ceil(total / limit)
  })
}

export const getBlogByBlogIdController = async (req: Request, res: Response) => {
  const blog_id = req?.params.blog_id

  if (!ObjectId.isValid(blog_id)) {
    throw new ErrorWithStatus({
      message: BLOG_MESSAGES.BLOG_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const result = await blogService.getBlogByBlogId(blog_id)

  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: BLOG_MESSAGES.BLOG_NOT_FOUND
    })
  }

  return res.status(200).json({
    message: BLOG_MESSAGES.GET_BLOG_DETAIL_SUCCESS,
    result: result
  })
}

export const getBlogByUserIdController = async (req: Request, res: Response) => {
  const user_id = req?.params.user_id
  console.log({ user_id })

  if (!ObjectId.isValid(user_id)) {
    console.log('tren')
    throw new ErrorWithStatus({
      message: BLOG_MESSAGES.BLOG_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const result = await blogService.getBlogByUserId(user_id)
  console.log({ result })

  if (!result) {
    console.log('duoi')
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: BLOG_MESSAGES.BLOG_NOT_FOUND
    })
  }

  return res.status(200).json({
    message: BLOG_MESSAGES.GET_BLOG_BY_USER_ID_SUCCESS,
    result: result
  })
}
