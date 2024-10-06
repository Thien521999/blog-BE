import { ObjectId } from 'mongodb'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { CategoryReqBody } from '~/models/requests/Category.requests'
import Category from '~/models/schemas/Category.schema'
import databaseService from './database.services'

class CategoryService {
  async createCategory({ user_id, payload }: { user_id: string; payload: CategoryReqBody }) {
    const category = await databaseService.category.findOne({ name: payload.name })
    if (category === null) {
      await databaseService.category.insertOne(new Category({ ...payload, user_id: new ObjectId(user_id) }))
      return {
        message: CATEGORY_MESSAGES.CATEGORY_SUCCESSFULLY
      }
    }

    return {
      message: CATEGORY_MESSAGES.CATEGORY_ALREADY_EXISTS
    }
  }
  async getListCategory() {
    const result = await databaseService.category.find().toArray()
    return result
  }
  async getCategoryDetail(category_id: string) {
    const result = await databaseService.category.findOne({ _id: new ObjectId(category_id) })

    return result
  }
  async updateCategory({ category_id, payload }: { category_id: string; payload: CategoryReqBody }) {
    const result = await databaseService.category.findOneAndUpdate(
      { _id: new ObjectId(category_id) },
      {
        $set: {
          ...payload
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )

    return result
  }
  async deleteCategory({ category_id }: { category_id: string }) {
    await databaseService.category.deleteOne({ _id: new ObjectId(category_id) })

    return {
      message: CATEGORY_MESSAGES.DELETE_CATEGORY_SUCCESS
    }
  }
}

const categoryService = new CategoryService()
export default categoryService
