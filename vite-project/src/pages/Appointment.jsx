import React, { use, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { AppContex } from '../contex/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../componments/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const{docId}=useParams()
  const {doctors,currenySymbol,token, backendUrl,getDoctorsData}=useContext(AppContex)
 const daysOfweek =['SUN' ,'MON','TUE','WED','THU','FRI','SAT']

  const [docInfo,setDocInfo]=useState(null)
  const  navigate = useNavigate()

  const[docSlots,setDocSlots]=useState([])
  const[slotIndex,setSlotIndex]=useState(0)
  const[slottime,setSlotTime]=useState('')
  
  const fetchDocInfo= async ()=>{
    const docInfo =doctors.find(doc => doc._id=== docId)
    setDocInfo(docInfo)
    console.log(docInfo);
    
  }
  const getAvailableSlots=async ()=>{
    setDocSlots([])
    let today=new Date()
    for(let i=0;i<7;i++){
       let currentdate= new Date(today)
       currentdate.setDate(today.getDate()+i)
       let endTime=new Date()
       endTime.setDate(today.getDate()+i)
       endTime.setHours(21,0,0,0)

       if(today.getDate()===currentdate.getDate()){
            currentdate.setHours(currentdate.getHours()>10 ? currentdate.getHours()+i:10)
            currentdate.setMinutes(currentdate.getMinutes()> 30? 30:0)
       }else{
        currentdate.setHours(10)
        currentdate.setMinutes(0)
       }
       let timeSlots =[]
       while(currentdate<endTime){
        let formattedTime =currentdate.toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})
        
        let day= currentdate.getDate()
        let month=currentdate.getMonth()+1
        let year=currentdate.getFullYear()
        const slotDate= day +'_'+ month +'_'+ year
        const slotTime= formattedTime
        
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        
        if(isSlotAvailable){
          timeSlots.push({
            datetime:new Date(currentdate),
            time: formattedTime
          })
        }
        currentdate.setMinutes(currentdate.getMinutes()+30)
       }
       setDocSlots(prev =>([...prev,timeSlots]))
    }
  }








  useEffect(()=>{
    fetchDocInfo()

  },[doctors,docId])

useEffect(()=>{
  getAvailableSlots()

},[docInfo])


const bookappoinment =async() =>{
  if(!token){
    toast.warn('Please login first')
    return navigate ('/login')

  }try{
    const date=docSlots[slotIndex][0].datetime
    let day= date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()

    const slotdate= day +'_'+ month +'_'+ year

    const {data}=await axios.post(backendUrl+'/api/user/bookappoinment', {docId,slotdate,slottime} , {headers:{token}})
    if(data.success){
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointments')
    }else{
      toast.error(data.message)
    }


  }catch(error){
    console.log(error)
    toast.error(error.message)
  }

}




useEffect(()=>{

  console.log(docSlots);
  
},[docSlots])





  return docInfo && (
    <div>
        {/* --- Doctors Details -----*/}
        <div className='flex flex-col sm:flex-row gap-4'>
          
           <div>
            <img  className={'bg-[#87CEFA] w-full sm:max-w-72 roundend-lg'}src={docInfo.Image} alt="" />
          </div>

         <div className='flex-1 border border-black-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
           {/* -------- Doc Info: name,degree, experience */}
           <p className='flex items-center gap-2 text-2xl font-medium text-black-900'>{docInfo.name}  <img  className={'w-5'}src={assets.verified_icon} alt="" /></p>
           <div className='flex items-center gap-2 text-sm mt-1 text-black-600'>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
           </div>
           {/* -------Doctor About */}
           <div >
            <p className='flex items-center gap-1 text-sm font-medium text-black-900 mt-3'>About  <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-black-500 max-w-[900px] mt-1'>{docInfo.about}</p>
           </div>
           <p className='text-black-500 font-medium mt-4'> Appoinment fee:
             <span className='text-black-600'>{currenySymbol}{docInfo.fees}</span></p>
          
        </div>
         

   </div>


   {/* ------Booking slots------- */}
   <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-black-700'>
      <p>Booking slots</p>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
        docSlots.length && docSlots.map((item,index)=>(
       <div onClick={()=>setSlotIndex(index)}
  className= {`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#87CEFA] text-white' : ''}`}
  key={index}
>

            <p>{item[0] && daysOfweek[item[0].datetime.getDay()]} </p>
            <p> {item[0]&& item[0].datetime.getDate()}</p>
          </div>

        ))
        }
      </div>

      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4' style={{maxHeight: '200px', overflowY: 'auto'}}> 
        {docSlots.length && docSlots[slotIndex].map((item,index)=>(
            
            <p
  onClick={() => setSlotTime(item.time)}
  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slottime ? 'bg-[#87CEFA] text-white' : 'text-black-400 border border-black-300'}`}
  key={index}
>
  {item.time.toLowerCase()}
</p>


        ))}
      </div>
      <button   onClick={bookappoinment}
      className='bg-[#87CEFA] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appoinment</button>
     
   </div>
     {/* listing related doctors */}
     <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

    </div>
  )
}

export default Appointment