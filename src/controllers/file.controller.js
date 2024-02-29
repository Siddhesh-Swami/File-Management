import { StatusCodes } from 'http-status-codes'

import { BadRequestError } from "../packages/utils/customErrors.js"
import responseSender from "../packages/utils/responder.js"
import fileService from '../services/file.service.js'

class FileMgmtContrller {

    constructor() {
    }

    async uploadFile(req, res, next) {
        try {

            responseSender({
                statusCode: StatusCodes.OK,
                message: "Files uploaded successfully",
                res
            })
        } catch (error) {
            next(error)
        }

    }

    async fetchFiles(req, res, next) {
        try {

            const files = await fileService.fetchFiles({})

            responseSender({
                statusCode: StatusCodes.OK,
                data: files,
                res
            })
        } catch (error) {
            next(error)
        }

    }

    async deleteFiles(req, res, next) {
        try {
            const files = req.body.files

            if (!files || !files.length) {
                throw new BadRequestError("filenames not provided")
            }
            await fileService.deleteFiles({ files })

            responseSender({
                statusCode: StatusCodes.OK,
                message: "files deleted successfully",
                res
            })
        } catch (error) {
            next(error)
        }
    }


}

// export a singleton
export default new FileMgmtContrller()