
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

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

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token: token})

    } catch (error) {
        console.log("userauth error2")

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
        const userId = req.user.id;

        // const {userId}= req.body //jo apn ne authUser me token me se nikal ke req.body pe attach kr di
         const userData= await userModel.findById(userId).select(' -password')
        
         res.json({success:true, userData})

    } catch (error) {
         res.json({success:false, message:error.message})
        
    }
}

//edit user profile
const editProfile= async (req,res)=>{
    try {
        const userId = req.user.id;

        const { name, phone, address, dob, gender}= req.body //userId is added in authuser
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
         res.json({success:false, message:error.message})
        
    }
}


//api to book appointment
const bookAppointment=async (req,res)=>{
    try {

        const userId = req.user.id;
const { docId, slotDate, slotTime } = req.body;
const docData= await doctorModel.findById(docId).select('-password')

        if(!docData.available){
console.log("doc not available")
            return res.json({success:false, message: "Doctor not available"})

        }

        let slots_booked = docData.slots_booked //already booked slots

        //checking for slots availability
        if(slots_booked[slotDate]) //if booked slot has tht date
        {
            if(slots_booked[slotDate].includes(slotTime)) //if tht date pe tht time already exists then no doc available
            {
                // console.log('failed here')
              return res.json({success:false, message:'Slot not available'})
            }
            else
            {
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData= await userModel.findById(userId).select('-password')

        delete docData.slots_booked//becos apan appointment save karte he toh docdata bhi save karte he toh kyu bookin slots save karna vo toh sirf chcek karne ke liye the na
        
        console.log("userId:", userId);
        console.log("userData:", userData);

        const appointmentData={
            userId, 
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newappointment= new appointmentModel(appointmentData)

        await newappointment.save()

         //saving new slots data wapis in doctors data na
         await doctorModel.findByIdAndUpdate(docId,{slots_booked})

         res.json({success:true, message: 'Appointment confirmed! See you at the clinic, take care till then'})
        
    } catch (error) {
        console.log(error.message)

         res.json({success:false, message:error.message})
        
    }
}


//APi to get user appoints for frontend myappointments page
// const listAppointment= async(req,res)=>{
//     try {
//         const {userId}= req.body
//         const appointments= await appointmentModel.find({userId})
//         res.json({success: true, appointments})

//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})   
//     }

// }

const listAppointment = async(req, res) => {
    try {
        const userId = req.user.id;  // ✅ use from auth middleware
        const appointments = await appointmentModel
            .find({ userId })
            .populate('docId') // ✅ populate doctor info
            .sort({ date: -1 }); // latest first (optional)
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



//api to cancel appointment

const cancelAppointment = async (req, res)=>{

    try {

         const userId = req.user.id;
        const { appointmentId}= req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if(appointmentData.userId!==userId){
            return res.json({success:false, message:"Unauthorized user"})
        }
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

//API to make Payment of appointment using razorpay


const paymentRazorpay = async (req, res)=>{
    try {

        const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

        const {appointmentId}= req.body
        const appointmentData= await appointmentModel.findById(appointmentId);
        if(!appointmentData || appointmentData.cancelled)
        {
            return res.json({success:false, message:"Appointment Cancelled or Not Found"})
        }

        //creating options for razorpay payment
        const options= {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }
        //creation on an order using these

        const order= await razorpayInstance.orders.create(options) 
        res.json({success: true, order})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
        
    }
}
 

//API to verify payment of razorpay

const verifyRazorpay = async(req, res)=>{
    try {
        

        const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})


        const {razorpay_order_id}= req.body;
        const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id)
        
        console.log(orderInfo);
        if(orderInfo.status==='paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            res.json({success:true, message: "Payment Successfull! "})
        }else{
             res.json({success:false, message: "Payment Failed!"}) 
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
        
    }

}


export {registerUser, cancelAppointment, listAppointment, bookAppointment, editProfile, getProfile, loginUser, paymentRazorpay, verifyRazorpay}