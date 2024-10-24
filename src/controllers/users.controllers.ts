import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { userVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import {
  ChangePasswordReqBody,
  ForgotPasswordReqBody,
  LoginReqBody,
  RefreshTokenReqbody,
  RegisterReqBody,
  TokenPayload,
  UpdatedMeReqBody,
  VerifyEmailReqBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)

  return res.status(200).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login({ user_id: user_id.toString(), verify: user.verify as userVerifyStatus })

  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqbody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id, verify, exp } = req.decoded_refresh_token as TokenPayload
  const result = await usersService.refreshToken({ user_id, refresh_token, verify, exp })
  return res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload

  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  // Đã verify rồi thì sẽ không báo lỗi
  // mà sẽ trả về status OK với message là đã verify trước đó rùi
  if (user.email_verify_token === '') {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await usersService.verifyEmail(user_id)

  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}

export const resendVerifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  if (user.verify === userVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await usersService.resendVerifyEmail(user_id)
  return res.json(result)
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id, verify } = req.user as User
  const result = await usersService.forgotPassword({
    user_id: new ObjectId(_id).toString(),
    verify
  })
  return res.json(result)
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORFOT_PASSWORD_SUCCESS
  })
}

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const user = await usersService.getMe(user_id)

  return res.json({
    message: USERS_MESSAGES.VERIFY_FORFOT_PASSWORD_SUCCESS,
    result: user
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdatedMeReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { body } = req
  const user = await usersService.updateMe(user_id, body)

  return res.json({
    message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
    result: user
  })
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { password } = req.body
  const result = await usersService.changePassword(user_id, password)

  return res.json(result)
}
