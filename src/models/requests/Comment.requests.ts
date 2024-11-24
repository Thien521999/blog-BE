export interface CommentReqBody {
  blog_id: string
  blog_author_id: string
  content: string
  root_comment_id?: string
  replied_to_user_id?: string
}
