import express from 'express'
import { addDoctor, allDoctors, loginAdmin } from '../controllers/admincontroller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorcontroller.js'


const adminRouter= express.Router()


adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availablity', authAdmin, changeAvailablity)

export default adminRouter
  