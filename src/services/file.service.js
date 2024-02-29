import fsPromises from "node:fs/promises"
import fs from "node:fs"
import { BadRequestError } from "../packages/utils/customErrors.js";

class FileService {

    async fetchFiles({ }) {

        const uploadsFolderPath = process.cwd() + "/uploads";

        const files = await fsPromises.readdir(uploadsFolderPath, { withFileTypes: true, recursive: true })
        // files is an array of directory Entries

        const filesList = files.filter((dirEnt) => dirEnt.isFile()).map((fileData) => { return fileData.path + "/" + fileData.name })

        return { filesList, count: filesList.length }
    }

    async deleteFiles({ files }) {

        const uploadsFolderPath = process.cwd() + "/uploads";

        const filesToDelete = files.filter(file => file.startsWith(uploadsFolderPath))

        for (const file of filesToDelete) {
            if (fs.existsSync(file)) {
                await fsPromises.rm(file)
            } else {
                throw new BadRequestError(`${file} file does not exist`)
            }
        }

    }



}

export default new FileService()



