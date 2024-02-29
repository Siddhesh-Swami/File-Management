import { Router } from "express"
import fileUpload from "../packages/middlewares/file.uploader.js"
import fileController from "../controllers/file.controller.js"
import FileCategorization from "../packages/utils/file.categorization.js"

class FileMgmtRouter {
    router
    uploadConfigs = []
    constructor() {
        this.router = Router()
        this.setUploadPaths()
        this.mountRoutes()
    }

    mountRoutes() {
        this.router.post("/upload", fileUpload.uploader(this.uploadConfigs), fileController.uploadFile)
        this.router.get("/", fileController.fetchFiles)
        this.router.post("/delete", fileController.deleteFiles)
    }

    setUploadPaths() {
        const currentDirectory = process.cwd()
        const irisImages = new FileCategorization({ maxCount: 2, targetDir: currentDirectory + "/uploads/biometric/iris", paramName: "irisImage", allowedExtensions: [".jpg", ".jpeg", ".png"] })
        const fingerPrintImages = new FileCategorization({ maxCount: 5, targetDir: currentDirectory + "/uploads/biometric/fingerprint", paramName: "fingerPrintImage", allowedExtensions: [".jpg", ".jpeg", ".png"] })

        this.uploadConfigs.push(irisImages)
        this.uploadConfigs.push(fingerPrintImages)
    }
}

export default new FileMgmtRouter().router
