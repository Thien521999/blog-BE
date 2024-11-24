import { CommentReqBody } from '~/models/requests/Comment.requests'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import Comment from '~/models/schemas/Comment.schema'

class CommentService {
  async createComment({ user_id, payload }: { user_id: string; payload: CommentReqBody }) {
    const comment = await databaseService.comment.insertOne(
      new Comment({
        ...payload,
        author_id: new ObjectId(user_id),
        blog_id: new ObjectId(payload.blog_id),
        blog_author_id: new ObjectId(payload.blog_author_id),
        root_comment_id: payload.root_comment_id ? new ObjectId(payload.root_comment_id) : undefined,
        replied_to_user_id: payload.replied_to_user_id ? new ObjectId(payload.replied_to_user_id) : undefined
      })
    )

    return comment
  }

  async getCommentsByBlogId({ blog_id, limit, page }: { blog_id: string; limit: number; page: number }) {
    const data = await databaseService.comment
      .aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  blog_id: new ObjectId(blog_id)
                }
              },
              {
                $lookup: {
                  from: 'users',
                  localField: 'author_id',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              {
                $project: {
                  user_id: 0
                }
              },
              {
                $unwind: {
                  path: '$user'
                }
              },
              {
                $sort: {
                  created_at: -1
                }
              },
              {
                $skip: limit * (page - 1)
              },
              {
                $limit: limit
              }
            ],
            totalCount: [
              {
                $match: {
                  blog_id: new ObjectId(blog_id)
                }
              },
              {
                $count: 'count'
              }
            ]
          }
        }
      ])
      .toArray()

    const comments = data[0].totalData
    const count = data[0].totalCount[0].count

    let total = 0
    if (count % limit === 0) {
      total = count / limit //
    } else {
      total = Math.floor(count / limit) + 1
    }

    return {
      comments,
      total
    }
  }

  async replyComment({ user_id, payload }: { user_id: string; payload: CommentReqBody }) {
    const { blog_id, blog_author_id, root_comment_id, replied_to_user_id } = payload

    const newComment = new Comment({
      ...payload,
      author_id: new ObjectId(user_id),
      blog_id: new ObjectId(blog_id),
      blog_author_id: new ObjectId(blog_author_id),
      root_comment_id: new ObjectId(root_comment_id),
      replied_to_user_id: new ObjectId(replied_to_user_id)
    })

    await databaseService.comment.findOneAndUpdate(
      {
        _id: new ObjectId(root_comment_id)
      },
      {
        $push: {
          replyCM: newComment
        }
      }
    )

    return newComment
  }
}

const commentService = new CommentService()
export default commentService
