import express  from 'express'
import { bookAppointment, cancelAppointment, editProfile, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser } from '../controllers/usercontroller.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post('/edit-profile', upload.single('image') , authUser, editProfile) //upload middleware from the multer file to upload image

userRouter.post('/book-appointment',authUser , bookAppointment)

userRouter.get('/list-appointment', authUser, listAppointment)

userRouter.post('/cancel-appointment', authUser, cancelAppointment)

userRouter.post('/payment-razorpay', authUser, paymentRazorpay)

export default userRouter




 