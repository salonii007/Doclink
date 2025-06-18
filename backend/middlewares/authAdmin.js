import jwt from 'jsonwebtoken'

//admin authentication middleware
const authAdmin= async (req, res, next)=>{
    try {
        const {atoken}=req.headers
        if(!atoken)
        {
            return res.json({success:false, message:"NOT Authorized! Please login again"} )
        }
        const token_decode= jwt.verify(atoken, process.env.JWT_SECRET);
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"NOT Authorized! Please login again"} )
        
        }
        //for the case token matches, i.e. authorized
        next();

    } catch (err) {
        console.log(err)
        res.json({
            success:false, message: `sorry! ${err.message}`
        })
        
    }

}
export default authAdmin