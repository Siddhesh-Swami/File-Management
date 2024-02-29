import path from "node:path"
import fs from "node:fs"

class FileCategorization {

    targetDir
    maxCount
    name
    allowedExtensions

    constructor({ maxCount, targetDir, paramName, allowedExtensions }) {
        // required for passing to multer.fields
        this.maxCount = maxCount;
        this.name = paramName;


        const destinationDir = targetDir
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true })
        }


        this.targetDir = targetDir
        this.allowedExtensions = allowedExtensions

    }

}

export default FileCategorization