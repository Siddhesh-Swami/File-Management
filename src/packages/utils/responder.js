
import express from "express"

const { response, request } = express


/**
 * Common Response Sender function
 * @param {Object} params 
 * @param {Object} params.data
 * @param {Error} params.err
 * @param {number} params.statusCode
 * @param {string} params.message
 * @param {response} params.res
 * @return {void} 
 */
export default function responseSender(params) {

    const { err, data, statusCode, message, res } = params

    const result = {
        message: message || 'Success',
        data: data || {},
        statusCode
    };


    if (!err) {
        res.status(statusCode || 200).json(result)
    } else {
        res.status(statusCode || 500).json(result)
    }

}
