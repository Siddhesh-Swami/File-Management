import { Router } from "express"

import fileController from "../controllers/file.controller.js"

class FileMgmtRouter {
    router
    constructor() {
        this.router = Router()
        this.mountRoutes()
    }

    mountRoutes() {
        this.router.post("/upload", fileController.uploadFile)
    }
}

export default new FileMgmtRouter().router
