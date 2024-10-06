import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import { CategoryReqBody } from '~/models/requests/Category.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import categoryService from '~/services/category.services'

export const categoryController = async (req: Request<ParamsDictionary, any, CategoryReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await categoryService.createCategory({ user_id, payload: req.body })

  return res.status(200).json(result)
}

export const getCategoryListController = async (req: Request, res: Response) => {
  const result = await categoryService.getListCategory()

  return res.status(200).json({
    message: CATEGORY_MESSAGES.GET_LIST_CATEGORY_SUCCESS,
    result: result
  })
}

export const getCategoryDetailController = async (req: Request, res: Response) => {
  const category_id = req?.params.category_id

  if (!ObjectId.isValid(category_id)) {
    throw new ErrorWithStatus({
      message: CATEGORY_MESSAGES.INVALID_CATEGORY_ID,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const result = await categoryService.getCategoryDetail(category_id)

  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: CATEGORY_MESSAGES.CATEGORY_NOT_FOUND
    })
  }

  return res.status(200).json({
    message: CATEGORY_MESSAGES.GET_CATEGORY_DETAIL_SUCCESS,
    result: result
  })
}

export const updateCategoryController = async (req: Request<ParamsDictionary, any, CategoryReqBody>, res: Response) => {
  const category_id = req?.params.category_id

  if (!ObjectId.isValid(category_id)) {
    throw new ErrorWithStatus({
      message: CATEGORY_MESSAGES.INVALID_CATEGORY_ID,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const result = await categoryService.updateCategory({ category_id, payload: req.body })

  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: CATEGORY_MESSAGES.CATEGORY_NOT_FOUND
    })
  }

  return res.status(200).json({
    message: CATEGORY_MESSAGES.UPDATE_CATEGORY_DETAIL_SUCCESS,
    result: result
  })
}

export const deleteCategoryController = async (req: Request, res: Response) => {
  const category_id = req?.params.category_id

  if (!ObjectId.isValid(category_id)) {
    throw new ErrorWithStatus({
      message: CATEGORY_MESSAGES.INVALID_CATEGORY_ID,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const result = await categoryService.deleteCategory({ category_id })

  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: CATEGORY_MESSAGES.CATEGORY_NOT_FOUND
    })
  }

  return res.status(200).json(result)
}
