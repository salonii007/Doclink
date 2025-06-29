import express  from 'express'
import { bookAppointment, editProfile, getProfile, loginUser, registerUser } from '../controllers/usercontroller.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post('/edit-profile', upload.single('image') , authUser, editProfile) //upload middleware from the multer file to upload image

userRouter.post('/book-appointment',authUser , bookAppointment)

export default userRouter




 