
import { Router } from 'express'

import fileMgmtRouter from './file.route.js'

class MainRouter {
    router
    constructor() {
        this.router = Router()
        this.mountRoutes()
    }

    mountRoutes() {
        this.router.use("/files", fileMgmtRouter)
    }
}

export default new MainRouter().router;

