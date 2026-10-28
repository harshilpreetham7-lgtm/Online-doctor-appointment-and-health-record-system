import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadsDir)
    },
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase()
        callback(null, `${Date.now()}-${randomUUID()}${extension}`)
    }
})

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, callback) => {
        if (!allowedImageTypes.has(file.mimetype)) {
            return callback(new Error('Only JPEG, PNG, and WebP images are allowed.'))
        }
        callback(null, true)
    }
})

export default upload