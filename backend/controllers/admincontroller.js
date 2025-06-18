//api for ADDING DOCTOR
// import .env from .env
import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import  jwt  from "jsonwebtoken"
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
        res.json({success:true, message:"data saved in the database"})
    }
    catch(err){
        console.log(err)
        res.json({success:false, message:`sorryy something went wrong, error: ${err.message}`})

    }

} 

//API for Admin login!
const loginAdmin= async (req, res)=>{
    try{

        const {email, password}= req.body;

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

export {addDoctor, loginAdmin}