import multer from "multer";
import path from "path"

import { BadRequestError } from "../utils/customErrors.js";
import fsPromises from "node:fs/promises"
import fs from "node:fs"


const allowedExtensions = [".xlsx", ".xls", ".jpg", ".jpeg", ".gif", ".png", ".doc", ".docx", ".ppt", ".pptx", ".txt", ".pdf", ".csv", ".zip"]
// const multerMiddleware = fileUpload.single("file")




class FileUploader {

    fileUploader

    constructor() {

        // create destination folder

        const currWorkingDir = process.cwd()
        const destinationDir = currWorkingDir + "/uploads"
        if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir)

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, destinationDir)
            },
            filename: function (req, file, cb) {
                // const extension = path.extname(file.originalname)
                const indexOfExtension = file.originalname.lastIndexOf(".")

                const fileName = file.originalname.substring(0, indexOfExtension)
                const extension = file.originalname.substring(indexOfExtension)

                const uniquefileName = fileName + '_' + Date.now() + extension
                cb(null, uniquefileName)
            }
        })

        const fileFilter = function (req, file, cb) {

            if (file.originalname.length > 255) {
                return cb(new BadRequestError('file name is too long'), false);
            }

            if (!allowedExtensions.includes(path.extname(file.originalname))) {
                return cb(new BadRequestError('following file type is not allowed'), false);
            }

            console.log(file)

            cb(null, true)

        }

        this.fileUploader = multer({
            storage,
            fileFilter: fileFilter,
        })
    }

    // async uploader(req, res, next) {
    //     try {

    //         return multerMiddleware(req, res, function (err) {

    //             try {
    //                 if (err instanceof multer.MulterError) {
    //                     throw new BadRequestError("Error while uploading file")
    //                 }

    //                 next()
    //             } catch (error) {
    //                 return next(error)
    //             }
    //         })
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    // pass a function that returns the middleware
    uploader() {
        return async (req, res, next) => {
            try {

                const multerMiddleware = this.fileUploader.single('file')

                multerMiddleware(req, res, function (err) {

                    try {
                        if (err) {
                            console.log(err)
                            if (err instanceof multer.MulterError || err instanceof BadRequestError) {
                                throw new BadRequestError(err.message)
                            }
                            throw err;
                        }



                        return next()
                    } catch (error) {
                        return next(error)
                    }


                })

            } catch (error) {
                return next(error)
            }

        }

    }

}

// export singleton instance
export default new FileUploader();