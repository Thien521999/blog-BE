import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import Blog from '~/models/schemas/Blog.schema'
import Category from '~/models/schemas/Category.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.schema'
import Comment from '~/models/schemas/Comment.schema'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blog.mmm7x.mongodb.net/?retryWrites=true&w=majority&appName=Blog`

// dung class
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  async indexUsers() {
    const exists = await this.users.indexExists(['account_1', 'account_1_password_1'])
    if (!exists) {
      this.users.createIndex({ account: 1 }, { unique: true })
      this.users.createIndex({ account: 1, password: 1 }, { unique: true })
    }
  }

  async indexRefreshTokens() {
    const exists = await this.refreshToken.indexExists(['token_1', 'exp_1'])
    if (!exists) {
      this.refreshToken.createIndex({ token: 1 }, { unique: true })
      this.refreshToken.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
    }
  }

  async indexCategory() {
    const exists = await this.category.indexExists(['name_1'])
    if (!exists) {
      this.category.createIndex({ name: 1 }, { unique: true })
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
  get category(): Collection<Category> {
    return this.db.collection(process.env.DB_CATEGORY_COLLECTION as string)
  }
  get blog(): Collection<Blog> {
    return this.db.collection(process.env.DB_BLOG_COLLECTION as string)
  }
  get comment(): Collection<Comment> {
    return this.db.collection(process.env.DB_COMMENT_COLLECTION as string)
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
