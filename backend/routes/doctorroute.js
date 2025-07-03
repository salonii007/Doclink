import express from 'express'
import { appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updatedocProfile } from '../controllers/doctorcontroller.js'
import authDoctor from '../middlewares/authDoctor.js'
import { appointmentCancel } from '../controllers/admincontroller.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor)

doctorRouter.get('/appointments', authDoctor, appointmentsDoctor )

doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)

doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)

doctorRouter.get('/dashboard', authDoctor, doctorDashboard)

doctorRouter.get('/profile', authDoctor, doctorProfile)

doctorRouter.post('/update-profile', authDoctor, updatedocProfile)

export default doctorRouter