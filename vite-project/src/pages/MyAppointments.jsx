import React, { useContext, useState, useEffect } from 'react'
import { AppContex } from '../contex/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

 const {backendUrl,token,getDoctorsData}=useContext(AppContex);
 const [appoinments, setAppoinment]= useState([])

const months=["","jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const slotDateFormat =(slotDate) =>{
  const DateArray=slotDate.split('_')
  return DateArray[0]+" "+months[Number (DateArray[1])]+" "+DateArray[2]

}


 const getUserAppoinments =async ()=>{
  try{
    const {data}=await axios.get(backendUrl + '/api/user/appoinments',{headers: {token}})
   if(data.success){
    setAppoinment(data.appointments.reverse())
   }
  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
 }


  const cancelAppoinment = async (appoinmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancelappoinment', { appoinmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppoinments();
        getDoctorsData();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const initorder = async (order)=>{
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options ={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, 
      currency: order.currency,
      name:"Appointment",
      description:"Test Transaction",
      order_id: order.id,
      receipt: order.receipt,
      handler : async (response)=>{        
        try {
          const verifyData = await axios.post(backendUrl + '/api/user/verifypayment', response, { headers: { token } });
          if (verifyData.data.success) {
            toast.success('Payment successful!');
            getUserAppoinments();
          } else {
            toast.error(verifyData.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error('Payment verification failed');
        }
      }
     
    }
    const rzp = new window.Razorpay(options);
    rzp.open();


  
}

const Razorpayment = async (appoinmentId) => {
  try {
    const { data } = await axios.post(backendUrl + '/api/user/razorpayment', { appoinmentId }, { headers: { token } });
    if (data.success) {
      console.log(data.order);
      await initorder(data.order);
    } else {
      toast.error(data.message || 'Payment initialization failed');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};



 useEffect(()=>{
  if(token){
    getUserAppoinments()
  }
 },[token])







  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appoinments</p>

      <div>
        {appoinments && appoinments.length > 0 && appoinments.map((item,index)=>(
       <div  className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
         <div>
          <img className='w-32 bg-indigo-50' src={item.docData.Image} alt="" />
         </div>
         <div className='flex-1 text-sm text-zinc-600'>
          <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
          <p>{item.docData.speciality}</p>
          <p className='text-zinc-700 font-medium mt-1'>Address:</p>
          <p className='text-xs'>{item.docData.address.line1}</p>
          <p className='text-xs'>{item.docData.address.line2}</p>
          <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date &Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
         </div>
         <div></div>
         <div className='flex flex-col gap-2 justify-end'>

          {!item.cancelled && item.payment && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#87CEFA] hover:text-white transition-all duration-300">Payment Done</button>}
   {!item.cancelled &&  !item.payment &&<button onClick={()=>{Razorpayment(item._id)}} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#87CEFA] hover:text-white transition-all duration-300">
  Pay Online
</button>}
        {!item.cancelled && <button onClick={()=>{cancelAppoinment(item._id)}} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300">
  Cancel Appointments
</button>}  
{item.cancelled && <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-all duration-300">Appoinment Cancelled</button>}

         </div>

   
        </div>
      ))}
       
    
      </div>

    </div>
  )
}

export default MyAppointments;