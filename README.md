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


### Tối ưu hiệu suất MongoDB
1. Index trong MongDB :
    - giúp query nhanh hơn nhưng tốn dung lượng bộ nhớ, mặc định luôn index _id trong mongoDB
2. Compound index
    - là index nhiều trường vs nhau
3. Index sắp xếp tăng dần và giảm dần
    - {age:{$lt:30}, sex:"male"} => $lt: là less than, $lte: less than equal( bé hơn hoặc bằng)
    - index là 1 thì sắp xếp tăng dần, -1 là giảm dần
    - vd: Một vài người nói muốn tăng hoặc giảm dần thì dùng sort,muốn thêm sao thêm => thì cái việc sắp xếp tăng dần và giảm dần có ý nghĩa gì ko => có , vì khi data `lớn` mà các bạn sort thì nó tốn thời gian hơn việc `mặc định cho auto sort`
4. Compound index rùi thì có cần index từng trường hay ko?
    - nên nha, test xem kết quả là biết ngay.

5. Index text
    - cu phap: {$text: {$search: 'Da Nang'}}
    - 1 Collections chỉ được 1 index text thui
    - Cách fix 1 luc index nhieu thang

6. Thao tac bang dong lenh
    - use earch
    - db.users.getIndexes()
    - db.users.createIndex({name: -1})
    - db.users.dropIndex('name_-1')

7. Ưu nhược điểm của index
    - Trong MongoDB, index là một cấu trúc dữ liệu giúp tăng tốc độ truy vấn và sắp xếp của các câu lệnh trong cơ sở dữ liệu. Nó hoạt động tương tự như bookmark của quyển sách, cần đi đến trang nào thì chỉ cần mở trang đó lên mà ko cần phải tìm kiếm từ đầu.

    **_Ưu điểm_** :
        Ưu điểm lớn nhất là tăng tốc độ truy vấn, từ đó giảm thiểu thời gian trả kết quả.

    **_ Nhược điểm _** :
        - Tốn dung lượng lưu trữ - Index tạo ra các bảng chỉ mục riêng biệt, từ đó làm tăng dung lượng bộ nhớ.

        - Tốn thời gian khi thêm, sửa, xoá dữ liệu: khi bạn thêm, sửa ,xoá dữ liệu trong các trường đã được tạo index, MongoDB sẽ phải cập nhật lại chỉ mục liên quan. Quá trình này tiếu tốn thời gian và tài nguyên hơn so với việc ko sử dụng index.

    **_Giới hạn của index _**:
        - Một collection chỉ có thể có tối đa 64 index.
        - Một collecton chỉ có 1 index text.

    **_Một số loại index phổ biến_**
        - Single Field Index: Index trên một trường duy nhất.
        - Compould Index: Index trên nhiều trường.
        - Search Index: Index trên một trường có kiểu dữ liệu là string, dùng đề tìm kiếm.

8. Index các trường trong collections users
    - indexUsers index khi connect db xong

9. Tối ưu index khi khởi động server
    - Kiểm tran nó có tồn tại index r thì ko index nữa
10. Tối ưu khác
    - Phân tích câu truy vấn với `explain`
    - Dùng MongoDB Driver lúc naò cũng nhanh hơn các ODM(ORM) như Mongose, Prisma vì nó bỏ qua lớp ảo hoá và truy vấn trực tiếp vào database.
    - Để server MongoDB gần với Server của bạn nhất có thể.
