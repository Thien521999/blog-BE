```ts
export enum userVerifyStatus {
  Unverified, // chưa xác thực email, mặc định 0
  Verified, // đã xác thực email
  Banned // bị khoá
}
```

```ts
interface User {
    _id?: ObjectId
    name: string
    account: string
    password: string
    avatar: string
    type: string
    created_at?: Date
    updated_at?: Date
    email_verify_token?: string // jwt or '' nếu đã xác thực email
    forgot_password_token?: string // jwt or '' nếu đã xác thực email
    verify?: userVerifyStatus
}
```

```ts
interface blog {
  _id?: ObjectId
  user_id: ObjectId
  title: string
  content: string
  description: string
  thumbnail: string
  category: string
  category_id: ObjectId
}
```

```ts
interface CategoryType {
  _id?: ObjectId
  name: string
  user_id: ObjectId
}
```

```ts
interface CommentType {
  _id?: ObjectId
  user_id: ObjectId
  blog_id: ObjectId
  blog_user_id: ObjectId
  content: string
  replyCM: ObjectId[]
  // reply_user: ObjectId
}
```