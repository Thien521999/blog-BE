import { RegisterReqBody } from '~/models/requests/User.requests'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import { ObjectId } from 'mongodb'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType, userVerifyStatus } from '~/constants/enums'

class UsersService {
  async signAccessToken({ user_id, verify }: { user_id: string; verify: userVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
      //   options: {
      //     expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      //   }
    })
  }
  async signRefreshsToken({ user_id, verify, exp }: { user_id: string; verify: userVerifyStatus; exp?: number }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
        // exp
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
      //   options: {
      //     expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      //   }
    })
  }
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    // const email_verify_token = await this.signEmailVerifyToken({
    //   user_id: user_id.toString(),
    //   verify: userVerifyStatus.Unverified
    // })
    console.log({ payload: payload })
    await databaseService.users.insertOne(
      new User({
        ...payload,
        // _id: user_id,
        // email_verify_token: '',
        password: hashPassword(payload.password)
      })
    )

    // // const user_id = result.insertedId.toString()
    // const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
    //   user_id: user_id.toString(),
    //   verify: userVerifyStatus.Unverified
    // })

    // const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    // await databaseService.refreshToken.insertOne(
    //   new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    // )

    // return {
    //   access_token,
    //   refresh_token
    // }
    return {
      status: 'ok'
    }
  }
}

const usersService = new UsersService()
export default usersService
