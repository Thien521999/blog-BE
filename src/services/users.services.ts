import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { TokenType, userVerifyStatus } from '~/constants/enums'
import { ChangePasswordReqBody, LoginReqBody, RegisterReqBody, UpdatedMeReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken, verifyToken } from '~/utils/jwt'
import databaseService from './database.services'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { USERS_MESSAGES } from '~/constants/messages'
import { update } from 'lodash'
config()

class UsersService {
  private signAccessToken({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  private signRefreshsToken({ user_id, verify, exp }: { user_id: string; verify: userVerifyStatus; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp
        },
        privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }
  private signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    //de gui kem token vao email
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }
  private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    //de gui kem token vao email
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }
  private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshsToken({ user_id, verify })])
  }
  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }
  async checkEmailExist(account: string) {
    const user = await databaseService.users.findOne({ account })
    return Boolean(user)
  }
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: user_id.toString(),
      verify: userVerifyStatus.Unverified
    })
    console.log({ 'email_verify_token - register': email_verify_token })
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        email_verify_token,
        password: hashPassword(payload.password)
      })
    )

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id.toString(),
      verify: userVerifyStatus.Unverified
    })

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )

    return {
      access_token,
      refresh_token
    }
  }
  async refreshToken({
    user_id,
    refresh_token,
    verify,
    exp
  }: {
    user_id: string
    refresh_token: string
    verify: userVerifyStatus
    exp: number
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, verify }),
      this.signRefreshsToken({ user_id, verify, exp }),
      databaseService.refreshToken.deleteOne({ token: refresh_token })
    ])
    const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: new_refresh_token,
        iat: decoded_refresh_token.iat,
        exp: decoded_refresh_token.exp
      })
    )

    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }
  async login({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id,
      verify
    })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )

    return {
      access_token,
      refresh_token
    }
  }
  async logout(refresh_token: string) {
    await databaseService.refreshToken.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }
  async verifyEmail(user_id: string) {
    // MongoDB cap nhat gia tri
    const [token] = await Promise.all([
      this.signAccessAndRefreshToken({ user_id, verify: userVerifyStatus.Verified }),
      databaseService.users.updateOne(
        {
          _id: new ObjectId(user_id)
        },
        {
          $set: {
            email_verify_token: '',
            verify: userVerifyStatus.Verified
          },
          $currentDate: {
            updated_at: true
          }
        }
      )
    ])

    const [access_token, refresh_token] = token

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )

    return {
      access_token,
      refresh_token
    }
  }
  async resendVerifyEmail(user_id: string) {
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: user_id.toString(),
      verify: userVerifyStatus.Unverified
    })

    // giả bộ gửi email
    console.log('Resend email verify', email_verify_token)

    // cập nhật lại giá trị email_verify_token trong document users
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: {
            email_verify_token,
            updated_at: '$$NOW'
          }
        }
      ]
    )

    return {
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
    }
  }
  async forgotPassword({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    const forgot_password_token = await this.signForgotPasswordToken({ user_id, verify })

    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: {
            forgot_password_token,
            updated_at: '$$NOW'
          }
        }
      ]
    )

    // gửi email kem duong link den email nguoi dung: https://twitter.com/forgot-password?token=token
    console.log('forgot_password_token', forgot_password_token)

    return {
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }
  async getMe(user_id: string) {
    const user = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )

    return user
  }
  async updateMe(user_id: string, payload: UpdatedMeReqBody) {
    const user = await databaseService.users.findOneAndUpdate(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          ...payload
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )

    return User
  }
  async changePassword(user_id: string, new_password: string) {
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          password: hashPassword(new_password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )

    return {
      message: USERS_MESSAGES.CHANGE_PASSWORD_SUCCESS
    }
  }
}

const usersService = new UsersService()
export default usersService
