import { Router } from 'express'
import { registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

/*
 * Desciption. Register a new user
 * Path: /register
 * Method: POST
 * Body: {name:string, email:string, password:string, confirm_password: string, date_of_birth: ISO8601}
 */
// usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/register', registerValidator, registerController)
// usersRouter.post(
//   '/register',
//   registerValidator,
//   (req, res, next) => {
//     console.log('router 1')
//     // next(new Error('Loi r do'))
//     throw new Error('Loi r do')
//   },
//   (req, res, next) => {
//     console.log('router 2')
//     next()
//   },
//   (err, req, res, next) => {
//     console.log('router 3')
//     res.status(400).json({ err: err?.message })
//     // next()
//   }
// )

export default usersRouter
// TSError: ⨯ Unable to compile TypeScript:
// cach fix vao file nodemon.json thêm : -T
