import express from 'express';
import { registeruser,login,getprofile,updateprofile,bookappoinment ,listAppoinment, cancelappoinment,Razorpayment,verifyRazorpay} from '../controller/usercontrolloer.js';
import authuser from '../middlewares/authuser.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();
userRouter.post('/register', registeruser);
userRouter.post('/login', login);
userRouter.get('/getprofile',authuser, getprofile);
userRouter.post('/update-profile',upload.single('Image'),authuser, updateprofile);
userRouter.post('/bookappoinment', authuser, bookappoinment);
userRouter.get('/appoinments', authuser, listAppoinment);
userRouter.post('/cancelappoinment', authuser, cancelappoinment);
userRouter.post('/razorpayment', authuser, Razorpayment);
userRouter.post('/verifypayment', authuser, verifyRazorpay);



export default userRouter