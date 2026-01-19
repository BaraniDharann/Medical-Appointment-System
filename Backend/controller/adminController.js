import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appoinmentModel.js'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'

//API FOR ADMIN LOGIN
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
       if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      
      const token = jwt.sign({ email,password }, process.env.JWT_SECRET)
        return res.json({ success: true, message: "Login Successful", token:token });

       }else{
        return res.json({ success: false, message: "Invalid Credentials" });
       }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" });
    }   
}

//Appoinment list all 
const appoinmentlist = async (req, res) => {
    try{
        const appoinments = await appointmentModel.find({})
        res.json({success: true, appoinments}) 
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for admin to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        
        //releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const docData = await doctorModel.findById(docId)
        let slots_booked = docData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment cancelled successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API FOR ADMIN FOR PANEL FOR ALL LIST

 const adminDashboardpanel = async (req,res) =>{

    try{
        const doctors = await doctorModel.find({})
        const Users = await userModel.find({})
        const appoinments=await appointmentModel.find({})

        const dashData = {
            doctors:doctors.length,
            patients:Users.length,
            appoinments:appoinments.length,
            latestAppoinments:appoinments.slice(-5).reverse(5,0)
        }
        res.json({success: true, dashData})

    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message})

    }

 }

//API to update doctor
const updateDoctor = async (req, res) => {
    try {
        const { doctorId, name, email, speciality, degree, experience, about, fees, address, available } = req.body
        const imageFile = req.file

        const updateData = { name, email, speciality, degree, experience, about, fees, address: JSON.parse(address), available }
        
        if (imageFile) {
            const imagePath = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            updateData.Image = imagePath.secure_url
        }

        await doctorModel.findByIdAndUpdate(doctorId, updateData)
        res.json({ success: true, message: "Doctor updated successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to delete doctor
const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.body
        await doctorModel.findByIdAndDelete(doctorId)
        res.json({ success: true, message: "Doctor deleted successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { adminLogin, appoinmentlist, cancelAppointment, adminDashboardpanel, updateDoctor, deleteDoctor };