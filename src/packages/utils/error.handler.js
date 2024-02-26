import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from './customErrors.js'

export default class ErrorHandler {

    /**
     * 
     * @param {Error} error 
     * @returns {CustomResponse}
     */
    getErrorCode(error) {
        if (error instanceof BadRequestError) {

            return { code: StatusCodes.BAD_REQUEST, message: error.message }
        }

        // if not a custom error return 500
        return { code: StatusCodes.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }

    }
}

/** 
 * @typedef {Object}  ErrorResults
 * @property {number} code
 * @property {string} message 
*/