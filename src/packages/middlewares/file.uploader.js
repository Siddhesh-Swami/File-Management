import multer from "multer";
import path from "path"

import { BadRequestError } from "../utils/customErrors.js";
import fs from "node:fs"


class FileUploader {

    fileUploader

    constructor() {

        // create destination folder

        const currWorkingDir = process.cwd()
        const destinationDir = currWorkingDir + "/uploads"
        if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir)

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, req.headers.uploadConfigs[file.fieldname].destinationDir)
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

            if (!req.headers.uploadConfigs[file.fieldname].allowedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
                return cb(new BadRequestError('following file type is not allowed'), false);
            }

            cb(null, true)

        }

        this.fileUploader = multer({
            storage,
            fileFilter: fileFilter,
        })
    }

    // pass a function that returns the middleware
    uploader(uploadConfigs) {
        return async (req, res, next) => {
            try {

                req.headers.uploadConfigs = {}
                for (const config of uploadConfigs) {

                    req.headers.uploadConfigs[config.name] = {
                        maxCount: config.maxCount,
                        destinationDir: config.targetDir,
                        name: config.name,
                        allowedExtensions: config.allowedExtensions
                    }
                }

                const multerMiddleware = this.fileUploader.fields(uploadConfigs)

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