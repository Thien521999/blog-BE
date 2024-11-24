import { ObjectId } from 'mongodb'

interface BlogType {
  _id?: ObjectId
  user_id: ObjectId
  title: string
  content: string
  description: string
  thumbnail: string
  //   category: string
  category_id: ObjectId
}

export default class Blog {
  _id?: ObjectId
  user_id: ObjectId
  title: string
  content: string
  description: string
  thumbnail: string
  //   category: string
  category_id: ObjectId

  constructor(blog: BlogType) {
    this._id = blog._id
    this.user_id = blog.user_id
    this.title = blog.title
    this.content = blog.content
    this.description = blog.description
    this.thumbnail = blog.thumbnail
    // this.category = blog.category
    this.category_id = blog.category_id
  }
}
