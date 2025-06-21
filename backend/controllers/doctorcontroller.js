import doctorModel from "../models/doctorModel.js"

//we will create multiple controller functions for multiple apis
const changeAvailablity = async (req , res)=>{
    try {
        
        const  {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available })
        res.json ({success: true, message: "Availablity Changed"})

    } catch (err) {

        console.log(err)
        res.json({success: false, message: err.message})
    }


}

export {changeAvailablity}