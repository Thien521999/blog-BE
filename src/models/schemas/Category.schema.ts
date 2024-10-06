import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  user_id: ObjectId
}

export default class Category {
  _id?: ObjectId
  name: string
  user_id: ObjectId

  constructor(category: CategoryType) {
    this._id = category._id
    this.name = category.name
    this.user_id = category.user_id
  }
}
