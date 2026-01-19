import validator from 'validator';
import bcrypt from 'bcrypt'; 
import {v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken';
import Doctor from '../models/doctorModel.js';
import appointmentModel from '../models/appoinmentModel.js';



//API for adding doctor details
const addDoctor = async (req, res) =>{

    try {
        const{ name, email, password, Image, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
       
        //checking if all fields are provided
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({success: false, message: "All fields are required"});
        }

        //validating email format
        if(!validator.isEmail(email) ){
             return res.json({success: false, message: "Invalid email format"});

        }
//validating password strength
        if(!validator.isStrongPassword(password)){
            return res.json({success: false, message: "Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols."});
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //upload image to server or cloud storage
        const imagePath = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const imageUrl = imagePath.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            Image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        };

        const NewDoctor = new Doctor(doctorData);
        await NewDoctor.save();
        res.status(200).json({message: "Doctor added successfully", doctor: NewDoctor});

    }catch (error) {
        res.status(500).json({message: "Error adding doctor", error: error.message});
    }

}



//API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
try {
const doctors = await Doctor.find({}).select('-password');
res.json({success: true, doctors}) ;
} catch (error) {
console.log(error)
res.json({success: false, message: error.message})
}
}


//API for docotor avaliablity

 const changeAvaliablity = async  (req,res) =>{
    
    try{
        const {doctorId} = req.body
     const dctMeta= await Doctor.findById(doctorId) 
     await Doctor.findByIdAndUpdate(doctorId,{available: !dctMeta.available})
     res.json({success: true, message: "Doctor status changed successfully"})
     

    }catch(error){
        res.json({success: false, message: error.message})
    }
 }


 const doctorList = async (req,res) =>{
    try{
        const doctors= await Doctor.find({}).select(['-email','-password'])
        res.json ({success:true,doctors})

    }catch(error){
        console.log(error.message)
        res.json ({success:false, message: error.message})

    }
 }
 //Api for doctor life status 

 const loginDoctor =async (req,res)=>{
    try{
        const {email, password}=req.body
        const doctor= await Doctor.findOne({email})
        if(!doctor){
            return res.json({success: false, message: "Doctor not found"})
        }
        const isMatch= await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
        return res.json({success: true, message: "Login successful", token})
          
        }else{
              return res.json({success: false, message: "Invalid credentials"})
        }
        

    }catch(error){
        console.log(error.message)
        res.json ({success:false, message: error.message})
 }
 }


 //API to get doctor appointments
 const appoinmentlist = async (req, res) => {
    try{
        const docId = req.docId
        const appoinments = await appointmentModel.find({docId})
        res.json({success: true, appoinments}) 
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
     
 }

 //API to mark appointment completed
 const appointmentComplete = async (req, res) => {
    try{
        const docId = req.docId
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: 'Appointment Completed'})
        } else {
            return res.json({success: false, message: 'Mark Failed'})
        }
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }

 //API to cancel appointment
 const appointmentCancel = async (req, res) => {
    try{
        const docId = req.docId
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message: 'Appointment Cancelled'})
        } else {
            return res.json({success: false, message: 'Cancellation Failed'})
        }
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }

 //API FOR DASHBOARD DOCTOR PANEL 

  const doctorDashboard = async (req, res) => {
    try{
         const docId = req.docId
        const appoinments = await appointmentModel.find({docId})
        let earnings =0
        appoinments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount
            }
        })
        let patients=[]

        appoinments.map(item=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

         const dashData = {
            appoinments: appoinments.length,
            earnings,
            patients: patients.length,
            latestAppoinments: appoinments.slice(-5).reverse()
        }
        res.json({success: true, dashData})
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
     
 }

//API get for doctor profile 
 const getprofile = async (req,res) =>{
     try{
        const docId = req.docId
        const profiledata= await Doctor.findById(docId).select('-password')
        res.json({success: true, profiledata})

     }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})

     }
 }
//update the doctor profile 

const updateprofile =async (req,res)=>{
    try{
        const docId = req.docId
        const {name, speciality, degree, experience, about, fees, address, available}=req.body
        const imageFile = req.file;
        
        const doctorData = {
            name,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            available
        };
        
        if(imageFile){
            const imagePath = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            doctorData.Image = imagePath.secure_url;
        }
        
        await Doctor.findByIdAndUpdate(docId, doctorData)
        res.json({success: true, message: "Profile updated successfully"})
        
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export { addDoctor ,allDoctors,changeAvaliablity,doctorList,loginDoctor,appoinmentlist,appointmentComplete,appointmentCancel,doctorDashboard ,getprofile,updateprofile};

