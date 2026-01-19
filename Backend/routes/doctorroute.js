import express from 'express';
import { doctorList, loginDoctor, appoinmentlist, appointmentComplete, appointmentCancel,doctorDashboard,getprofile,updateprofile } from '../controller/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
import upload from '../middlewares/multer.js';

const doctorRouter = express.Router();
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appoinmentlist)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, getprofile)
doctorRouter.post('/update-profile', authDoctor, upload.single('image'), updateprofile)
export default doctorRouter