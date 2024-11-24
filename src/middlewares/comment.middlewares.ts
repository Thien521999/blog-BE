import { checkSchema } from 'express-validator'
import { COMMENT_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const commentValidator = validate(
  checkSchema({
    content: {
      notEmpty: {
        errorMessage: COMMENT_MESSAGES.CONTENT_IS_REQUIRED
      },
      isString: {
        errorMessage: COMMENT_MESSAGES.CONTENT_MUST_BE_A_STRING
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 3000
        },
        errorMessage: COMMENT_MESSAGES.CONTENT_LENGTH_MUST_BE_FROM_1_TO_3000
      }
    },
    blog_id: {
      notEmpty: {
        errorMessage: COMMENT_MESSAGES.BLOG_ID_IS_REQUIRED
      }
    },
    blog_author_id: {
      notEmpty: {
        errorMessage: COMMENT_MESSAGES.BLOG_AUTHOR_ID_IS_REQUIRED
      }
    },
    replyCM: {
      optional: true,
      isArray: {
        errorMessage: COMMENT_MESSAGES.REPLY_CM_MUST_BE_AN_ARRAY
      }
    }
  })
)
