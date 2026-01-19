import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { set } from "mongoose";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

     const  backenUrl= import.meta.env.VITE_BACKEND_URL
     const [dToken,setDToken]= useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'):'')
      const [appoinments,setAppoinments]= useState([])
      const [dashData,setDashData]= useState(false)
      const[getprofile,setgetprofile]= useState(false)

     const getAppoinment = async () => {
        try {
            const { data } = await axios.get(backenUrl + '/api/doctor/appointments', {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                setAppoinments(data.appoinments.reverse())
            } else {
                console.log(data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backenUrl + '/api/doctor/complete-appointment', 
                { appointmentId }, 
                { headers: { dtoken: dToken } }
            )
            if (data.success) {
                getAppoinment()
            } else {
                console.log(data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backenUrl + '/api/doctor/cancel-appointment', 
                { appointmentId }, 
                { headers: { dtoken: dToken } }
            )
            if (data.success) {
                getAppoinment()
            } else {
                console.log(data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

     const getDashboard = async () =>{
        try{
            const {data}= await axios.get(backenUrl + '/api/doctor/dashboard', {headers:{dtoken:dToken}})
        
            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }

        }catch (error ){
            console.log(error)
            toast.error(error.message)
        }
     }

   const profiledata = async () => {
        try {
            const { data } = await axios.get(backenUrl + '/api/doctor/profile', {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                setgetprofile(data.profiledata)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateProfile = async (formData) => {
        try {
            const { data } = await axios.post(backenUrl + '/api/doctor/update-profile', formData, {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                toast.success(data.message)
                await profiledata()
                return true
            } else {
                toast.error(data.message)
                return false
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            return false
        }
    }



    const value = {
        dToken,setDToken,  
        backenUrl,
        appoinments,setAppoinments,
        getAppoinment,
        completeAppointment,
        cancelAppointment,
        getDashboard,
        dashData,setDashData,
        profiledata,
        getprofile,setgetprofile,
        updateProfile
    };


    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
