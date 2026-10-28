import jwt from 'jsonwebtoken';

//user authentication middleware
const authUser=async(req,res,next)=>{
    try {
        const {token}=req.headers

        if(!token){
            return res.status(401).json({success:false,message:"You're Not Authorized Login Again!"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);

        // attach userId to request in a safe way
        req.userId = token_decode && token_decode.id;
        if (!req.body) req.body = {};
        req.body.userId = req.userId;

        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Your session is invalid or expired. Please log in again." })
        }
        console.error(error)
        return res.status(500).json({ success: false, message: "Authentication failed." })
    }

}

export default authUser