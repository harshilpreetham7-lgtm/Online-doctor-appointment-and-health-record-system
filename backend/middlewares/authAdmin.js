import jwt from 'jsonwebtoken';

//admin authentication middleware
const authAdmin=async(req,res,next)=>{
    try {
        const {atoken}=req.headers

        if(!atoken){
            return res.status(401).json({success:false,message:"You're Not Authorized Login Again!"})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET);

        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false,message:'Not Authorized Login Again!'});
        }

        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Your admin session is invalid or expired. Please log in again." })
        }
        console.error(error)
        return res.status(500).json({ success: false, message: "Admin authentication failed." })
    }

}

export default authAdmin