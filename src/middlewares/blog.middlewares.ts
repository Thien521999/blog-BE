import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { BLOG_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const blogValidator = validate(
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: BLOG_MESSAGES.TITTLE_IS_REQUIRED
        },
        isString: {
          errorMessage: BLOG_MESSAGES.TITTLE_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 10,
            max: 50
          },
          errorMessage: BLOG_MESSAGES.TITTLE_LENGTH_MUST_BE_FROM_10_TO_50
        }
      },
      content: {
        notEmpty: {
          errorMessage: BLOG_MESSAGES.CONTENT_IS_REQUIRED
        },
        isString: {
          errorMessage: BLOG_MESSAGES.CONTENT_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 200,
            max: 3000
          },
          errorMessage: BLOG_MESSAGES.CONTENT_LENGTH_MUST_BE_FROM_200_TO_3000
        }
      },
      description: {
        notEmpty: {
          errorMessage: BLOG_MESSAGES.DESCRIPTION_IS_REQUIRED
        },
        isString: {
          errorMessage: BLOG_MESSAGES.DESCRIPTION_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 50,
            max: 200
          },
          errorMessage: BLOG_MESSAGES.DESCRIPTION_LENGTH_MUST_BE_FROM_50_TO_200
        }
      },
      thumbnail: {
        notEmpty: {
          errorMessage: BLOG_MESSAGES.TITTLE_IS_REQUIRED
        },
        isString: {
          errorMessage: BLOG_MESSAGES.TITTLE_MUST_BE_A_STRING
        },
        trim: true
      },
      category_id: {
        custom: {
          options: async (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                message: BLOG_MESSAGES.INVALID_CATEGORY_ID,
                status: HTTP_STATUS.BAD_REQUEST
              })
            }

            const category = await databaseService.category.findOne({
              _id: new ObjectId(value)
            })

            if (!category) {
              throw new ErrorWithStatus({
                message: BLOG_MESSAGES.CATEGORY_NOT_FOUND,
                status: HTTP_STATUS.BAD_REQUEST
              })
            }

            req.category = category
            return true
          }
        }
      }
    },
    ['body']
  )
)
