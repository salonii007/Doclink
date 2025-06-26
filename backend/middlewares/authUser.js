import jwt from 'jsonwebtoken'

//User authentication middleware
const authUser= async (req, res, next)=>{
    try {
        const {token}=req.headers
        if(!token)
        {
            return res.json({success:false, message:"Not Authorized! Please login again"} )
        }
        const token_decode= jwt.verify(token, process.env.JWT_SECRET);
        
        // req.userId=token_decode.id;
        req.user = { id: token_decode.id };

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