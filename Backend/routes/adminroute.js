import express from 'express';
import {addDoctor, allDoctors, changeAvaliablity} from '../controller/doctorController.js';
import upload from '../middlewares/multer.js';
import { adminLogin, appoinmentlist, cancelAppointment,adminDashboardpanel, updateDoctor, deleteDoctor } from '../controller/adminController.js';
import authuser from '../middlewares/authuser.js';

const adminRouter = express.Router();
adminRouter.post('/add-doctor', authuser, upload.single('Image'), addDoctor);
adminRouter.post('/admin-login', adminLogin);
adminRouter.get('/all-doctors', authuser, allDoctors);
adminRouter.post('/change-avaliablity', authuser, changeAvaliablity);
adminRouter.get('/appoinments', authuser, appoinmentlist);
adminRouter.post('/cancel-appointment', authuser, cancelAppointment);
adminRouter.get('/dashboard', authuser, adminDashboardpanel);
adminRouter.post('/update-doctor', authuser, upload.single('Image'), updateDoctor);
adminRouter.post('/delete-doctor', authuser, deleteDoctor);
export default adminRouter;