import express from "express"
import cors from 'cors'
import multer from 'multer'
import 'dotenv/config'
//import connectCloudinary from "./config/cloudinary.js"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"


//app configuration
const app = express()
const port = process.env.PORT || 4000
if (process.env.MONGODB_URI) {
    connectDB().catch((err) => console.error('Database connection failed:', err.message))
} else {
    console.warn('Database not configured: set MONGODB_URI')
}
try {
    await connectCloudinary()
    console.log('Cloudinary configured')
} catch (err) {
    console.warn('Cloudinary not configured:', err.message)
}

//middlewares(Built-in middleware🤣)
app.use(express.json())
app.use(cors())

//API endpoints
app.use('/api/admin',adminRouter);//4000/api/admin
app.use('/api/doctor',doctorRouter);//4000/api/admin
app.use('/api/user',userRouter);//4000/api/admin

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400
        return res.status(status).json({ success: false, message: error.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller.' : 'Invalid image upload.' })
    }
    if (error.message === 'Only JPEG, PNG, and WebP images are allowed.') {
        return res.status(400).json({ success: false, message: error.message })
    }
    next(error)
})


app.get('/',(req,res)=>{
    res.send('API is Working Great');
})

app.listen(port,()=>console.log("Server is started",port));