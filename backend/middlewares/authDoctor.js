import jwt from 'jsonwebtoken';


//doctor authentication middleware
const authDoctor= async (req, res, next)=>{
    try {
        const {dtoken}=req.headers
        if(!dtoken)
        {
            return res.json({success:false, message:"Not Authorized! Please login again"} )
        }
        const dtoken_decode= jwt.verify(dtoken, process.env.JWT_SECRET);
        
        // req.doctorId=dtoken_decode.id;
        req.docId =  dtoken_decode.id

        //for the case dtoken matches, i.e. authorized
        next();

    } catch (err) {
        console.log(err)
        res.json({
            success:false, message: `sorry! ${err.message}`
        })
        
    }

}

export default authDoctor;