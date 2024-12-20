export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Name length must be from 1 to 50',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Name length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_FROM_6_TO_50: 'Confirm password must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',

  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is requried',
  REFRESH_TOKEN_IS_REQUIRED: 'Reresh token is requried',
  REFRESH_TOKEN_IS_INVALID: 'Reresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verify before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password is required',
  VERIFY_FORFOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  INVALID_FORFOT_PASSWORD: 'Invalid forgot password token',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_My_PROFILE_SUCCESS: 'Get my profile success',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_STRING: 'Bio must be string',
  BIO_LENGTH: 'Name must be from 1 to 200',
  LOCATION_MUST_BE_STRING: 'Location must be string',
  LOCATION_LENGTH: 'Location must be from 1 to 200',
  WEBSITE_MUST_BE_STRING: 'Website must be string',
  WEBSITE_LENGTH: 'Website must be from 1 to 200',
  USERNAME_MUST_BE_STRING: 'User name must be a string',
  USERNAME_INVALID:
    'User name must be 4-15 characters long and contain only letters, numbers, underscores, not only numbers',
  IMAGE_URL_MUST_BE_STRING: 'Cover photo must be string',
  IMAGE_URL_LENGTH: 'Avatar must be from 1 to 400',
  UPDATE_ME_SUCCESS: 'Update me success',
  FOLLOW_SUCCESS: 'Follow success',
  INVALID_USER_ID: 'Invalid user id',
  FOLLOWED: 'Followed',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  USERNAME_EXISTED: 'Username existed',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  GMAIL_NOT_VERIFIED: 'Gmail not verified',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success'
} as const // as const de khoi thay doi message nay

export const TWEET_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non empty string',
  CONTENT_MUST_BE_EMPTY_STRING: 'Content must be empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'Mentions must be an array of user id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object',
  INVALID_TWEET_ID: 'Invalid tweet id',
  TWEET_NOT_FOUND: 'Tweet not found',
  TWEET_IS_NOT_PUBLIC: 'Tweet is not public'
} as const

export const BOOKMARK_MESSAGES = {
  BOOKMARK_SUCCESSFULLY: 'Bookmark successfully',
  UNBOOKMARK_SUCCESSFULLY: 'Unbookmark successfully'
} as const

export const CATEGORY_MESSAGES = {
  CATEGORY_SUCCESSFULLY: 'Create category successfully',
  CATEGORY_ALREADY_EXISTS: 'Category already exists',
  GET_LIST_CATEGORY_SUCCESS: 'Get category list success',
  GET_CATEGORY_DETAIL_SUCCESS: 'Get category detail success',
  UPDATE_CATEGORY_DETAIL_SUCCESS: 'Update category success',
  CATEGORY_NOT_FOUND: 'Category not found',
  DELETE_CATEGORY_SUCCESS: 'Delete category success',
  INVALID_CATEGORY_ID: 'Invalid category id',
  CATEGORY_NAME_INVALID: 'Category name invalid',
  CATEGORY_NAME_EXISTED: 'Category name existed'
}

export const BLOG_MESSAGES = {
  BLOG_SUCCESSFULLY: 'Blog successfully',
  BLOG_ALREADY_EXISTS: 'Blog already exists',
  TITTLE_IS_REQUIRED: 'Tittle is required',
  TITTLE_MUST_BE_A_STRING: 'Tittle must be a string',
  TITTLE_LENGTH_MUST_BE_FROM_10_TO_50: 'Tittle length must be from 10 to 50',
  CONTENT_IS_REQUIRED: 'Content is required',
  CONTENT_MUST_BE_A_STRING: 'Content must be a string',
  CONTENT_LENGTH_MUST_BE_FROM_200_TO_3000: 'CONTENT LENGTH MUST BE FROM 200 TO 3000',
  DESCRIPTION_IS_REQUIRED: 'Description is required',
  DESCRIPTION_MUST_BE_A_STRING: 'Description must be a string',
  DESCRIPTION_LENGTH_MUST_BE_FROM_50_TO_200: 'Description length must be from 50 to 200',
  INVALID_CATEGORY_ID: 'Invalid category id',
  CATEGORY_NOT_FOUND: 'Category not found',
  GET_LIST_BLOG_SUCCESS: 'Get list blog success',
  BLOG_NOT_FOUND: 'Blog not found',
  INVALID_BLOG_ID: 'Invalid blog id',
  GET_BLOG_DETAIL_SUCCESS: 'Get blog detail success',
  GET_BLOG_BY_USER_ID_SUCCESS: 'Get blog by user id success'
}

export const COMMENT_MESSAGES = {
  CREATE_COMMENT_SUCCESS: 'Create comment successfully',
  CONTENT_IS_REQUIRED: 'Content is required',
  CONTENT_MUST_BE_A_STRING: 'Content must be a string',
  CONTENT_LENGTH_MUST_BE_FROM_1_TO_3000: 'Content length must be from 1 to 3000',
  BLOG_ID_IS_REQUIRED: 'Blog id is required',
  BLOG_AUTHOR_ID_IS_REQUIRED: 'Blog author id is required',
  REPLY_CM_MUST_BE_AN_ARRAY: 'Reply cm must be an array',
  GET_COMMENT_SUCCESS: 'Get comment success',
  REPLY_COMMENT_SUCCESS: 'Reply comment success'
}
