import { validate } from '~/utils/validation'
import { checkSchema, ParamSchema } from 'express-validator'
import { CATEGORY_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { REGEX_USERNAME } from '~/constants/regex'
import databaseService from '~/services/database.services'

export const categoryValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        // isLength: {
        //   options: {
        //     min: 1,
        //     max: 50
        //   },
        //   errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_50
        // }
        custom: {
          options: async (value, { req }) => {
            if (!REGEX_USERNAME.test(value)) {
              throw Error(CATEGORY_MESSAGES.CATEGORY_NAME_INVALID)
            }

            const user = await databaseService.category.findOne({ name: value })

            // Neu data ton tai categoryname nay trong db
            // thi chung ta ko cho phep update
            if (user) {
              throw Error(CATEGORY_MESSAGES.CATEGORY_NAME_EXISTED)
            }
          }
        }
      }
    },
    ['body']
  )
)
