import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()
 
const AdminContextProvider =(props)=>{
   const [aToken,setAToken]= useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'')
  const [doctors,setDoctors]=useState([])
  const [appoinments,setAppoinments]= useState([])
  const [dashData,setDashData]= useState(null)
   const backendUrl= import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', {
                headers: { atoken: aToken }
            })
            if (data.success) {
                setDoctors(data.doctors)
            }
        } catch (err) {
            console.log(err)
        }
    }




    const changeAvaliablity = async (doctorId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-avaliablity', { doctorId }, {
                headers: { atoken: aToken }
            })
            if (data.success) {
                getAllDoctors()
            }
        } catch (err) {
            console.log(err)
        }
    }

 const getAppoinments= async (req,res)=>{
    try{
        const {data}= await axios.get(backendUrl + '/api/admin/appoinments',{headers:{atoken:aToken}})
     
      if(data.success){
        setAppoinments(data.appoinments)
      }else{
        toast.error(data.message)
      }

    }catch(error){
        toast.error(error.message)

    }
 }

 const getDashboardData = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
            headers: { atoken: aToken }
        })
        if (data.success) {
            setDashData(data.dashData)
        }
    } catch (error) {
        toast.error(error.message)
    }
 }





    const value = {
        aToken, setAToken, backendUrl, doctors, getAllDoctors, changeAvaliablity,appoinments,getAppoinments,setAppoinments,setDoctors,dashData,getDashboardData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider