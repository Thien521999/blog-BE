import { ObjectId } from 'mongodb'

interface ReplyCommentType {
  comment_id: ObjectId // ID của comment được reply
  user_id: ObjectId // ID của người dùng reply comment
}

interface CommentType {
  _id?: ObjectId // ID của comment (MongoDB)
  author_id: ObjectId // ID của người dùng tạo comment
  blog_id: ObjectId // ID của bài blog được comment
  blog_author_id: ObjectId // ID của người dùng tạo blog
  content: string // Nội dung của comment
  replyCM?: Comment[] // Mảng các ID của các comment được reply
  root_comment_id?: ObjectId //  ID của comment gốc (nếu là reply)
  replied_to_user_id?: ObjectId // ID của người dùng được reply
  created_at?: Date // Thời gian tạo comment
  updated_at?: Date // Thời gian cập nhật comment
}

export default class Comment {
  _id?: ObjectId
  author_id: ObjectId
  blog_id: ObjectId
  blog_author_id: ObjectId
  content: string
  replyCM?: Comment[]
  root_comment_id?: ObjectId
  replied_to_user_id?: ObjectId
  created_at?: Date
  updated_at?: Date

  constructor(comment: CommentType) {
    this._id = comment._id
    this.author_id = comment.author_id
    this.blog_id = comment.blog_id
    this.blog_author_id = comment.blog_author_id
    this.content = comment.content
    this.replyCM = comment.replyCM || []
    this.root_comment_id = comment.root_comment_id
    this.replied_to_user_id = comment.replied_to_user_id
    this.created_at = comment.created_at || new Date()
    this.updated_at = comment.updated_at || new Date()
  }
}
