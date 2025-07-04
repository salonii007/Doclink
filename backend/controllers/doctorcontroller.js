import appointmentModel from "../models/appointmentModel.js"
import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

const doctorList= async(req, res)=>{
      try {
     const doctors = await doctorModel.find({}).select('-password -email') 

        res.json({success:true, doctors})

        
      } catch (error) {
         console.log(error)
        res.json({success: false, message: error.message})
    
      }
}

//api for doctor login
const loginDoctor= async(req, res)=>{
    try {
        const {email,password}= req.body
        const doctor= await doctorModel.findOne({email})

        if(!doctor)
        {
            return res.json({success:false, message:"Invalid credentials"})
        }
        const isMatch= await bcrypt.compare(password, doctor.password )
        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET) 
            res.json({success:true, token})
        }
        else
        {
             return res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
    
      } 
}

//Api to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res)=>{
    try {
        const {docId}= req.docId
        const appointments= await appointmentModel.find({docId})

        res.json({success:true, appointments})
        
    } catch (error) {
         console.log(error)
        res.json({success: false, message: error.message})
    }
}

//Api to mark Appointment Completed for doctor panel
const appointmentComplete = async(req, res)=>{
   try {
    const docId= req.docId

    const{appointmentId}= req.body

    const appointmentData= await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId===docId){
    await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted : true})
    return res.json({success: true, message:"Appointment Completed"})
    }
    else{
        res.json({success: true, message: 'Mark Failed'})
    }
   } catch (error) {
     console.log(error)
        res.json({success: false, message: error.message})
   } 
}

//api to mark cancel appointment
const appointmentCancel = async(req, res)=>{
   try {

        const {docId}= req.docId
    const{ appointmentId}= req.body

    const appointmentData= await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId===docId){
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true})
    return res.json({success: true, message:"Appointment Cancelled"})
    }
    else{
        res.json({success: true, message: 'Cancellation Failed'})
    }
   } catch (error) {
     console.log(error)
        res.json({success: false, message: error.message})
   } 
}


//API to get dashboard data for doctor panel

const doctorDashboard = async(req, res)=>{
    try{
        const {docId}= req.docId

        const appointments= await appointmentModel.find({docId})
        let earnings= 0;
        appointments.map((item)=>{

            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }

        })
        let patients = []

        appointments.map((item)=>{
            if(patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData= {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({success:true, dashData})

    }catch(err){
        console.log(err.message)
        res.json({success: false, message: err.message })
    }
}

//api to get doctor profile for doctor pane
const doctorProfile= async(req, res)=>{
    try {
        const docId= req.docId
        const profileData= await doctorModel.findById(docId).select('-password')

        res.json({success:true, profileData});

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})   
    }
}

//api to update doctor profile

const updatedocProfile= async(req,res)=>{
    try {
        const docId= req.docId
        const{ fees, address, available}=req.body
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
       console.log(error)
        res.json({success:false, message:error.message})   
    }
}
export {changeAvailablity,updatedocProfile, doctorProfile, doctorDashboard, appointmentsDoctor, loginDoctor, doctorList, appointmentCancel, appointmentComplete}