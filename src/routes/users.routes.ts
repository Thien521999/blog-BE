import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
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
 * Body: {name:string, email:string, password:string, confirm_password: string, date_of_birth: ISO8601}
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

export default usersRouter
// TSError: ⨯ Unable to compile TypeScript:
// cach fix vao file nodemon.json thêm : -T
