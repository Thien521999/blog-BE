import { ObjectId } from 'mongodb'
import { userVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name: string
  account: string
  password: string
  avatar?: string
  type?: number
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt or '' nếu đã xác thực email
  forgot_password_token?: string // jwt or '' nếu đã xác thực email
  verify?: userVerifyStatus
}

export default class User {
  _id?: ObjectId
  name: string
  account: string
  password: string
  avatar: string
  type: number
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt or '' nếu đã xác thực email
  forgot_password_token?: string // jwt or '' nếu đã xác thực email
  verify: userVerifyStatus

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.account = user.account
    this.password = user.password
    this.avatar = user.avatar || ''
    this.type = user.type || 0
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || userVerifyStatus.Unverified
  }
}
