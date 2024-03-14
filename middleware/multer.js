import multer from 'multer';
//import fs from 'fs/promises';
import { access, mkdir } from 'node:fs/promises';

const storage = multer.diskStorage({
    destination: async (req, file, next) => {
        const uploadDir = "./uploads";

        try {
            await access(uploadDir);
            console.log("directory exists");
        }
        catch (error) {
            console.log("directory not existant");
            await mkdir(uploadDir);
        }

        next(null, uploadDir);
    },
    filename: (req, file, next) => {
        const fileSplit = file.originalname.split('.');
        const format = fileSplit[fileSplit.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        next(null, uniqueSuffix + "." + format);
    }
})

const upload = multer({
    storage: storage,
    // limits: { filesize: 2 * 1024 * 1024 },
    fileFilter: (req, file, next) => {
        const formats = [
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif'
        ]
        if (formats.includes(file.mimetype)) {
            next(null, true)
        }
        else {
            next(null, false);
        }
    }
});

export default upload;