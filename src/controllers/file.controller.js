import { StatusCodes } from 'http-status-codes'

import { BadRequestError } from "../packages/utils/customErrors.js"
import responseSender from "../packages/utils/responder.js"

class FileMgmtContrller {

    constructor() {
    }

    async uploadFile(req, res, next) {
        try {

            // throw new BadRequestError("File upload failed")

            responseSender({
                statusCode: StatusCodes.OK,
                message: "File uploaded successfully",
                res
            })
        } catch (error) {
            next(error)
        }

    }


}

// export a singleton
export default new FileMgmtContrller()