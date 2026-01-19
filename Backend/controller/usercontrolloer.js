import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appoinmentModel.js'
import razorpay from 'razorpay'



//API FOR REGISTER LOGIN 

 const registeruser = async (req, res) => {
    try {
        const {name, email, password}=req.body

        if (!name || !email || !password) {
            return res.json({success: false, message: "Please fill all the fields"})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Invalid email format"})
        }
        if(!validator.isStrongPassword(password)){
            return res.json({success: false, message: "Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols."})
        }

        // hashing user password 
         const salt= await bcrypt.genSalt(10)
         const hashedPassword= await bcrypt.hash(password,salt)
      
         const userData = {
            name,
            email,
            password: hashedPassword
         }

         const newUser = new userModel(userData)
         await newUser.save()

         const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
         return res.json({success: true, message: "User registered successfully", token})


    }catch (error){

        console.log(error)
        res.json({success: false, message: error.message})

    }
}


//API FOR LOGIN


 const login = async (req, res) => {
    try {
        const {email, password}=req.body    

        if (!email || !password) {
            return res.json({success: false, message: "Please fill all the fields"})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Invalid email format"})
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found"})
        }    
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({success: true, message: "Login successful", token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API for user profile

const getprofile = async (req,res) =>{
    try{
        const userId = req.userId
        const user= await userModel.findById(userId).select('-password')    
        return res.json({success: true, user})
    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})

    }
}


//API FOR UPDATE PROFILE 

 const updateprofile = async (req,res) =>{
    try{
        const userId = req.userId
        const{name, phone, address, dob,gender}=req.body
        const imageFile=req.file
        if(!name || !phone || !address || !dob || !gender){
            return res.json({success: false, message: "Please fill all the fields"})
        }
        
        const updateData = {name, phone, address: JSON.parse(address), dob, gender}
        
        if(imageFile){
            const imageupload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            updateData.Image = imageupload.secure_url
        }
        
        await userModel.findByIdAndUpdate(userId, updateData)
        
        return res.json({success: true, message: "Profile updated successfully"})
    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API for get appointments

const bookappoinment = async (req,res) => {
    try{
        const userId = req.userId
        const {docId, slotdate, slottime}=req.body
        const docData= await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success: false, message: "Doctor is not available"})
        }
       
         let slots_booked = docData.slots_booked

         //checking for avalialibty slots_booked
      if(slots_booked[slotdate]){
        if(slots_booked[slotdate].includes(slottime)){
            return res.json({success: false, message: "Slot is not available"})
        }else{
            slots_booked[slotdate].push(slottime)
        }
      }else{
        slots_booked[slotdate]=[]
        slots_booked[slotdate].push(slottime)
      }

       const userData= await userModel.findById(userId).select('-password')
       delete docData.slots_booked

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime:slottime,
            slotDate:slotdate,
            date: Date.now()
        }
        const newAppointment= new appointmentModel(appointmentData) 
        await newAppointment.save()

        //save the new slots docdata 
         await doctorModel.findByIdAndUpdate(docId, {slots_booked})
         res.json({success: true, message: "Appointment booked successfully", newAppointment})

    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//Api for user appoinment list in appoinment page

 const listAppoinment = async (req,res) =>{
    try{
        const userId = req.userId
        const appointments = await appointmentModel.find({userId})
        res.json({success: true, appointments})
    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//Api for cancel appoinment 

 const cancelappoinment = async (req,res)=>{
    try{
        const userId = req.userId
        const {appoinmentId}=req.body
        const appoinmentData= await appointmentModel.findById(appoinmentId)

if(!appoinmentData){
    return res.json({success: false, message: "Appointment not found"})
}

if(appoinmentData.userId !== userId){
    return res.json({success: false, message: "You are not authorized to cancel this appointment"})
}
 await appointmentModel.findByIdAndUpdate(appoinmentId, {cancelled: true})
 //releasing doctor slot

 const {docId,slotDate,slotTime}=appoinmentData
 const docData= await doctorModel.findById(docId)
 let slots_booked = docData.slots_booked
 slots_booked[slotDate]=slots_booked[slotDate].filter(e => e!==slotTime)
 
 await doctorModel.findByIdAndUpdate(docId, {slots_booked})
 res.json({success: true, message: "Appointment cancelled successfully"})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }

 const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_PASSWORD
})

//Api for Razorpay payment

 const Razorpayment = async (req,res) =>{

    try{
         const {appoinmentId}=req.body

    const appoinmentData= await appointmentModel.findById(appoinmentId)

    if(!appoinmentData || appoinmentData.cancelled){
        return res.json({success: false, message: "Appointment not found"})
    }
    //CREATEING OPTIONS FOR RAZORPAYMENT

    const options={
        amount: appoinmentData.amount*100,
        currency: "INR",
        receipt: appoinmentData._id
    }
    //create order 
    const order = await razorpayInstance.orders.create(options)
    res.json({success: true, order})

    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})

    }
   

 }

 const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: 'Payment successful' });
        } else {
            res.json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



export {registeruser, login, getprofile, updateprofile,bookappoinment,listAppoinment, cancelappoinment,Razorpayment,verifyRazorpay}