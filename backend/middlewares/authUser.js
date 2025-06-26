import jwt from 'jsonwebtoken'

//User authentication middleware
const authUser= async (req, res, next)=>{
    try {
        const {utoken}=req.headers
        if(!utoken)
        {
            return res.json({success:false, message:"NOT Authorized! Please login again"} )
        }
        const token_decode= jwt.verify(utoken, process.env.JWT_SECRET);
        
        req.body.userId=token_decode.id;
        //for the case token matches, i.e. authorized
        next();

    } catch (err) {
        console.log(err)
        res.json({
            success:false, message: `sorry! ${err.message}`
        })
        
    }

}

export default authUser;