
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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
        res.json({success:true, utoken})

    } catch (error) {

        res.json({success:false, message:error.message})
    }
} 

//Api for user login


export {registerUser}