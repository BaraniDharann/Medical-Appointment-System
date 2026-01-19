import React from 'react'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>

    <div className='text-center text-2xl pt-10 text-black-500'>
      <p>About <span className='text-black-700 font-medium'> Us</span></p>
    </div>
     <div className='my-10 flex flex-col md:flex-row gap-15'>
    <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
     
     <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-black-600 '>
      <p>Welcome to Prescripto, your trusted parter in managing you healthcare needs conveniently and efficiently at prescripto, we understand the challenges individuals foce when it comes to scheduling doctor appointments and managing their health records</p>
      <p>Prescripto committed to excellence is healthcare technology, we continuously strive to enhance our platform integrating the latest advancements to inprove user experience and deliver superior service. whether you're Booking you final appoinment or managing ongoing core.prescripto is here to support you every step of the way.</p>
      <b className='text-black-800'>Our Vision</b>
      <p>Our vision At prescripto to create a seamiess healthcare experience for every user. we aim to bridge the gap between patients and healthcare providers,making it easier for you to access the care you need,when you need it.</p>
     </div>
     </div>

     <div className='text-xl my-4'>
      <p>WHY <span className='text-black-500 font-semibold'>CHOOSE US</span></p>
     </div>
     <div  className=' flex flex-col md:flex-row mb-20'>
<div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#87CEFA] hover:text-white transition-all duration-300 text-black cursor-pointer ">
        <b>Efficiency:</b>
        <p>Streamlined appoinment scheduling that fits into you busy lifestyle.</p>
      </div>
      <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#87CEFA] hover:text-white transition-all duration-300 text-black cursor-pointer">

         <b>Convenience:</b>
         <p>Access to a network of  trusted healthcare professionals in your area.</p>
      </div>
      <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#87CEFA] hover:text-white transition-all duration-300 text-black cursor-pointer ">

         <b>Personalization</b>
         <p>Tailored recommendations and reminders to help you stay on top of your health.</p>

      </div>
     </div>
        
    </div>
  )
}

export default About