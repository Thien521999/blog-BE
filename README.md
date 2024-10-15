### Error handling

Trong ExpressJs co 2 loai handler

## 1: Request handler

Nhận request từ client và trả về response.

Với mỗi request handler thì chung ta se co 3 loai tham so `req`, `res`, `next`

Nếu ko dùng `next` thì ko cần khai báo cũng dc

- Gọi `next()` để chuyển request sang request handler tiếp theo
- Gọi `next(err)` để chuyển request sang error handler tiếp theo

Khi xảy ra lỗi trong synchronous(đồng bộ) handler thì tự động sẽ được chuyển sang error handler => có nghĩa là
 khi          ``next(new Error('Loi rui ban'))``
 tương đương  ``throw new Error('Loi rui ban)``
``Nhớ là chỉ synchronous thui nha, async no gay ra loi``

Khi xảy ra lỗi trong synchronous handler thì phải gọi `next(err)` để chuyển sang error handler

## 2: Error handler

Nhận error từ request handler và trả về response

Với mỗi error handler thì chúng ta bắt **buộc phải khai bao du co 4 tham so** là
`err`, `req`, `res`, `next`

Nếu chỉ khai báo 3 tham số là request handler

```ts


```

### updateOne and findOneAndUpdate

- `updateOne`: chi update ko tra ve document

- `findOneAndUpdate`:
    + update va tra ve document,
    + mac dinh `findOneAndUpdate` tra ve document cũ, muốn trả về mới thêm returnDocument: 'after',

### formidable

- là một thư viện trong Node.js được sử dụng chủ yếu để xử lý việc tải tệp lên (file uploads). Nó hỗ trợ các tính năng sau:

- Tải tệp lên từ biểu mẫu (form uploads): formidable cho phép bạn dễ dàng xử lý các biểu mẫu có chứa tệp tin tải lên, mà không cần phải tự mình xử lý các luồng dữ liệu từ phía client.

- Xử lý nhiều loại dữ liệu: Ngoài việc tải tệp, formidable cũng hỗ trợ việc phân tích dữ liệu từ các biểu mẫu gửi đi bằng các phương thức HTTP như POST, PUT.

- Xử lý dữ liệu dưới dạng multipart/form-data: Đây là định dạng thường được dùng khi bạn cần tải tệp tin cùng với dữ liệu khác từ phía người dùng.