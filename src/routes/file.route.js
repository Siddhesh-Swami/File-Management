import { Router } from "express"

import fileUpload from "../packages/middlewares/file.uploader.js"
import fileController from "../controllers/file.controller.js"

class FileMgmtRouter {
    router
    constructor() {
        this.router = Router()
        this.mountRoutes()
    }

    mountRoutes() {
        this.router.post("/upload", fileUpload.uploader(), fileController.uploadFile)
    }
}

export default new FileMgmtRouter().router
