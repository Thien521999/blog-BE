import { JwtPayload } from 'jsonwebtoken'
import { TokenType, userVerifyStatus } from '~/constants/enums'

export interface RegisterReqBody {
  name: string
  account: string
  password: string
}

export interface LoginReqBody {
  account: string
  password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: userVerifyStatus
  exp: number
  iat: number
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  user_id: string
  verify: userVerifyStatus
}

export interface UpdatedMeReqBody {
  name?: string
  avatar?: string
}
