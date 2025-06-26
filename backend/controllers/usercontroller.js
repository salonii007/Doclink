
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

//sign up for user api
const registerUser= async(req, res)=>{
    try {
        const {name, email, password}= req. body
        if(!name || !email || !password)
        {
            throw new Error("Fill required fields")
        }
        if(!validator.isEmail(email)){
            throw new Error("Enter a valid email")
        }
        if(password.length < 8){
            throw new Error("Enter a strong password")
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedpass= await bcrypt.hash(password, salt)

        const userdata = {name, email, password:hashedpass}

        const newuser= new userModel(userdata)

        const user = await newuser.save()
        //iss se  ._id filed mil jayegi-- iss se apan token banayenge

        const utoken = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token: utoken})

    } catch (error) {

        res.json({success:false, message:error.message})
    }
} 

//Api for user login
const loginUser= async(req,res)=>{
    try{
    const {email, password}= req.body
    const user= await userModel.findOne({email})
    
    if(!user)
    {
        throw new Error("User does not exist")
    }
    const isMatch= await bcrypt.compare(password,user.password)

    if(isMatch){
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token})
    }else{
         res.json({success:false, message: "Invalid Credentials"})
    }

    }
    catch(err){
        res.json({success:false, message:err.message})
    }

}

//api to get user profile

const getProfile = async (req,res)=>{
    try {
        const {userId}= req.body //jo apn ne authUser me token me se nikal ke req.body pe attach kr di
         const userData= await userModel.findById(userId).select(' -password')
        
         res.json({success:true, userData})

    } catch (error) {
         res.json({success:false, message:error.message})
        
    }
}

//edit user profile
const editProfile= async (req,res)=>{
    try {

        const {userId, name, phone, address, dob, gender}= req.body //userId is added in authuser
        const imageFile= req.file

        if(!name || !phone || !address || !dob || !gender){
            throw new   Error("Data missing")
        }
        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender}) //find by id and update baki bacha hua

        if(imageFile){
            //upload image to cloudinary and get the link
            const imgUpload= await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            const imageUrl= imgUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageUrl})
        }
        
        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        
    }
}




export {registerUser, editProfile, getProfile, loginUser}