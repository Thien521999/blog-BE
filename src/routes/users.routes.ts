import { Router } from 'express'
import {
  changePasswordController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { fiterMiddeware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordMeValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdatedMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handler'

const usersRouter = Router()

/*
 * Desciption. Login a user
 * Path: /login
 * Method: POST
 * Body: { account:string, password:string }
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/*
 * Desciption. Register a new user
 * Path: /register
 * Method: POST
 * Body: {name:string, account:string, password:string}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/*
 * Desciption. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/*
 * Desciption. Verify email
 * Path: /verify-email
 * Method: POST
 * Header: { }
 * Body: { email_verify_token: string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/*
 * Desciption. Resend verify email
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/*
 * Desciption. Forgot Password
 * Path: /forgot-password
 * Method: POST
 * Header: { }
 * Body: {account: string}
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/*
 * Desciption. Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Header: { forgot_password_token: string }
 * Body: {}
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/*
 * Desciption. Get user
 * Path: /me
 * Method: POST
 * Header: {}
 * Body: {}
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/*
 * Desciption. Update my profile
 * Path: /me
 * Method: PATCH
 * Header: { Authorization: Bearer <access_token> }
 * Body: UserSchema
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  fiterMiddeware<UpdatedMeReqBody>(['name', 'avatar']), // fiterMiddeware : dung de loc nhung body ko can thiet,body ko can the ko can thiet update
  wrapRequestHandler(updateMeController)
)

/*
 * Desciption. Change password
 * Path: /change-password
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: {old_password: string, password: string, confirm_password: string}
 */
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordMeValidator,
  wrapRequestHandler(changePasswordController)
)

export default usersRouter
// TSError: ⨯ Unable to compile TypeScript:
// cach fix vao file nodemon.json thêm : -T
