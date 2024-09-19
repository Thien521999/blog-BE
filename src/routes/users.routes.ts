import { Router } from 'express'

const usersRouter = Router()

/*
 * Desciption. Register a new user
 * Path: /register
 * Method: POST
 * Body: {name:string, email:string, password:string, confirm_password: string, date_of_birth: ISO8601}
 */
// usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/register', () => {})

export default usersRouter
