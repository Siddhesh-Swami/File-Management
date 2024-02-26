
import express from 'express'

import mainRouter from './src/routes/router.js'
import ErrorHandler from './src/packages/utils/error.handler.js'
import responseSender from './src/packages/utils/responder.js'

const app = express()
const errorHandler = new ErrorHandler()

const router = express.Router()
const port = 3000

class Server {
    #app

    /**
     * 
     * @param {express.Application} app 
     */
    constructor(app) {
        this.#app = app
        this.loadRoutes()
        this.errorHandler()
        this.startServer()
    }

    loadRoutes() {
        this.#app.use("/", mainRouter)
    }



    // common error handler for all requests
    errorHandler() {

        this.#app.use(function (err, req, res, next) {
            const { message, code } = errorHandler.getErrorCode(err)

            responseSender({
                err,
                data: null,
                statusCode: code,
                message,
                res
            })

        })
    }

    startServer() {
        this.#app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    }

}

export default new Server(app)



