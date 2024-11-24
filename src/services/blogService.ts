import { BlogReqBody } from '~/models/requests/Blog.request'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import Blog from '~/models/schemas/Blog.schema'
import { BLOG_MESSAGES } from '~/constants/messages'

class BlogService {
  async createBlog({ user_id, payload }: { user_id: string; payload: BlogReqBody }) {
    const blog = await databaseService.blog.findOne({ title: payload.title })

    if (blog === null) {
      await databaseService.blog.insertOne(
        new Blog({ ...payload, user_id: new ObjectId(user_id), category_id: new ObjectId(payload.category_id) })
      )

      return {
        message: BLOG_MESSAGES.BLOG_SUCCESSFULLY
      }
    }
    return {
      message: BLOG_MESSAGES.BLOG_ALREADY_EXISTS
    }
  }
  async getHomeBlogs({ limit, page }: { limit: number; page: number }) {
    const blogs = await databaseService.blog
      .aggregate<Blog>([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_id'
          }
        },
        {
          $lookup: {
            from: 'category',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category_id'
          }
        },
        {
          $project: {
            title: 1,
            content: 1,
            description: 1,
            thumbnail: 1,
            user: {
              $map: {
                input: '$user_id',
                as: 'user',
                in: {
                  name: '$$user.name',
                  account: '$$user.account'
                }
              }
            },
            category: {
              $map: {
                input: '$category_id',
                as: 'category',
                in: {
                  name: '$$category.name',
                  user_id: '$$category.user_id'
                }
              }
            }
          }
        },
        {
          $unwind: {
            path: '$user'
          }
        },
        {
          $unwind: {
            path: '$category'
          }
        },
        {
          $skip: limit * (page - 1)
        },
        {
          $limit: limit
        }
      ])
      .toArray()

    const total = await databaseService.blog.countDocuments()
    console.log({ blogs, total })

    return { blogs, total }
  }
  async getBlogByBlogId(blog_id: string) {
    const [result] = await databaseService.blog
      .aggregate<Blog>([
        {
          $match: {
            _id: new ObjectId(blog_id)
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_id'
          }
        },
        {
          $lookup: {
            from: 'category',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category_id'
          }
        },
        {
          $project: {
            title: 1,
            content: 1,
            description: 1,
            thumbnail: 1,
            user: {
              $map: {
                input: '$user_id',
                as: 'user',
                in: {
                  name: '$$user.name',
                  account: '$$user.account'
                }
              }
            },
            category: {
              $map: {
                input: '$category_id',
                as: 'category',
                in: {
                  name: '$$category.name',
                  user_id: '$$category.user_id'
                }
              }
            }
          }
        },
        {
          $unwind: {
            path: '$user'
          }
        },
        {
          $unwind: {
            path: '$category'
          }
        }
      ])
      .toArray()

    return result
  }
  async getBlogByUserId(user_id: string) {
    const result = await databaseService.blog
      .aggregate<Blog>([
        {
          $match: {
            user_id: new ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_id'
          }
        },
        {
          $lookup: {
            from: 'category',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category_id'
          }
        },
        {
          $project: {
            title: 1,
            content: 1,
            description: 1,
            thumbnail: 1,
            user: {
              $map: {
                input: '$user_id',
                as: 'user',
                in: {
                  name: '$$user.name',
                  account: '$$user.account'
                }
              }
            },
            category: {
              $map: {
                input: '$category_id',
                as: 'category',
                in: {
                  name: '$$category.name',
                  user_id: '$$category.user_id'
                }
              }
            }
          }
        },
        {
          $unwind: {
            path: '$user'
          }
        },
        {
          $unwind: {
            path: '$category'
          }
        }
      ])
      .toArray()

    return result
  }
}

const blogService = new BlogService()
export default blogService
