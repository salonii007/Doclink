//api for ADDING DOCTOR
// import .env from .env
import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import  jwt  from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"
// import cloudinary from "../config/cloudinary.js";

//API for adding doctor
const addDoctor= async (req, res)=>{
    try{
        const {name, email, password, speciality, degree, experience, about, fees, address}= req.body; //ye sab aayega input me
        const imageFile=req.file 

        // console.log({name, email, password, speciality, degree, experience, about, fees, address, imageFile})
        
        //validate data becore adding doctor

        if(!name|| !email || !password || !speciality || !degree || !experience || !about ||!fees ||  !address )
        {
            return res.json({success:false , message:"Missing Details"})
        }

        //validate email format

        if(!validator.isEmail(email)){
            throw new Error ("Enter a valid email")
        }
        const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      throw new Error ("Doctor with this email already exists")
    }



        //validting strong password
        if(password.length <8){

             throw new Error ("Enter a strong password")
        
        }

        //password encrypt karke save karenge
        const salt= await bcrypt.genSalt(10)
        const passwordhash= await bcrypt.hash(password,salt)

        if (!imageFile) {
        return res.json({ success: false, message: "Image file is missing" });
         }
        //upload image to clodinary
        const imageUpload= await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        //the response generated will be stored in imageUpload variable
        const imageUrl= imageUpload.secure_url  //this is cloudinary image ki url


        //saving data in database!
        const doctordata={
            name,
            email,
            image:imageUrl,
            password: passwordhash,
            degree,
            speciality,
            fees,
            about,
            experience,
            address:JSON.parse(address),
            date:Date.now()//return timestamp
        }
        const newdoctor= new doctorModel(doctordata) //saving data in db!

        await newdoctor.save()
        res.json({success:true, message:"Doctor added successfully"})
    }
    catch(err){
        console.log(err)
        console.log("Thiss")
        res.json({success:false, message:`Sorryy! Something went wrong, error: ${err.message}`})

    }

} 

//API for Admin login!
const loginAdmin= async (req, res)=>{
    try{

        const {email, password} = req.body;
        // console.log(`here here ${req.body}`)

        if (email===process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD)
        {
           const token= jwt.sign(email+password, process.env.JWT_SECRET)
           res.json({success:true, token})
        }
        else{
            throw new Error ("INVALID ADMIN CREDENTIALS")
        }


    }
    catch(err){
        console.log(err)
        res.json({succes:false, message:`Sorryyy! something went wrong ${err.message}`})
    }

}

//API to get all doctors list for admin panel
const allDoctors= async(req, res)=>{
    try {
        const doctors= await doctorModel.find({}).select('-password') //it will retrieve all data except password
        res.json({success:true, doctors})
        
    } catch (error) {
         console.log(err)
        res.json({succes:false, message:`Sorryyy! something went wrong ${err.message}`})
    }
}
 
//api to get all apointments list
const appointmentsAdmin = async (req, res)=>{
    try {
        const appointments= await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        
        
    }
}


//api for cancel appointment by admin
const appointmentCancel = async (req, res)=>{

    try {

        const {appointmentId}= req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
        

        //releasing the cancelled appointment doctor slot

        const {docId, slotDate, slotTime}= appointmentData

        const doctorData= await doctorModel.findById(docId)


        let slots_booked= doctorData.slots_booked

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:"Appointment Cancelled"})

    } catch (error) {
         console.log(error);
        res.json({success:false, message:error.message})   
    }

}

//api to get dashboard data for admin panel
const adminDashboard = async (req, res)=>{
    try {
        const doctors = await doctorModel.find({})
        const users= await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData= {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success: true, dashData})

        
    } catch (error) { 
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {addDoctor,appointmentCancel, appointmentsAdmin, loginAdmin , allDoctors, adminDashboard}