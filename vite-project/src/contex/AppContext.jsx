import { createContext, useEffect, useState } from "react";
import { doctors } from '../assets/assets';
import axios from 'axios';
export const AppContex=createContext ()
import { toast } from "react-toastify";
import { set } from "mongoose";

const AppContexProvider=(props)=>{
   
    const currenySymbol ='$'

 const backendUrl= import.meta.env.VITE_BACKEND_URL
 const [doctors,setdoctors]= useState([])
 const[token,setToken]= useState(localStorage.getItem('token')? localStorage.getItem('token'):false)
 const [userData,setUserData]= useState(false)

    


     const getDoctorsData = async () => {
        try{
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setdoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch (error ){
            console.log(error.message)
            toast.error(error.message)

        }
         
     }


  const uploadprofile =async () =>{
    try{
      const {data}= await axios.get(backendUrl + '/api/user/getprofile', {headers:{token}})
      if(data.success){
       const user = data.user
       if(typeof user.address === 'string'){
         try{
           user.address = JSON.parse(user.address)
         }catch(e){
           user.address = {line1: '', line2: ''}
         }
       }
       setUserData(user)
      }else{
        toast.error(data.message)
      }
  }catch (error){
    console.log(error)
    toast.error(error.message)
  }
}

     const value={
     
        doctors,getDoctorsData,currenySymbol,token,setToken,backendUrl,userData,setUserData,uploadprofile
    }


     useEffect(() => {
        getDoctorsData()
    }, [])

     useEffect(() => {
        const interval = setInterval(() => {
            getDoctorsData()
        }, 30000)
        return () => clearInterval(interval)
    }, [])



useEffect(()=>{
    if(token){
        uploadprofile()
    }else{
        setUserData(false)
    }
},[token])


    return(
        <AppContex.Provider value={value}>
            {props.children}
        </AppContex.Provider>
    )
}
export default AppContexProvider