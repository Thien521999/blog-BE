import { Router } from 'express'
import {
  categoryController,
  deleteCategoryController,
  getCategoryDetailController,
  getCategoryListController,
  updateCategoryController
} from '~/controllers/category.controllers'
import { categoryValidator } from '~/middlewares/category.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const categoryRouter = Router()

/*
 * Desciption. Create a new category
 * Path: /category
 * Method: POST
 * Body: {name:string}
 */
categoryRouter.post(
  '/create',
  accessTokenValidator,
  verifiedUserValidator,
  categoryValidator,
  wrapRequestHandler(categoryController)
)

/*
 * Desciption. Get category list
 * Path: /list
 * Method: GET
 * Body: {}
 */
categoryRouter.get('/list', wrapRequestHandler(getCategoryListController))

/*
 * Desciption. Get category detail
 * Path: /:category_id
 * Method: GET
 * Body: { }
 */
categoryRouter.get('/:category_id', wrapRequestHandler(getCategoryDetailController))

/*
 * Desciption. Update category
 * Path: /:category_id
 * Method: PATCH
 * Body: { CategorySchema }
 */
categoryRouter.patch(
  '/:category_id',
  accessTokenValidator,
  verifiedUserValidator,
  categoryValidator,
  wrapRequestHandler(updateCategoryController)
)

/*
 * Desciption. Delete category
 * Path: /:category_id
 * Method: DELETE
 * Body: { }
 */
categoryRouter.delete(
  '/:category_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(deleteCategoryController)
)

export default categoryRouter
