import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'

// console.log(__dirname)
// console.log(path.resolve('uploads'))
export const uploadSingleImageController = async (req: Request, res: Response) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    minFileSize: 20 * 1024 // 300kb
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }

    res.json({
      message: 'Upload image successfully'
    })
  })

  //   return res.json({
  //     message: 'hehe'
  //   })
}
