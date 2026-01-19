import React from 'react'
import { assets } from '../assets/assets';


const Contact = () => {
  

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-black-500'>
        <p> CONTACT <span className='text-black-700 font-semibold'> US</span> </p>
      </div>
      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm'>
         <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
      
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-black-700'>Our OFFICE</p>
        <p className='text-black-500 '>54709 Willms Station Suite 350, washington, USA</p>
        <p className='text-black-500 '>Tel: (91) 9597965911</p>
        <p className='font-semibold text-lg text-black-700'>Carees at Prescripto</p>
        <p className='text-black-500'> Learn more about our teams and job openings</p>
             <button className='border border-black px-8 py-4 text-sm hover:bg-[#87CEFA] hover:text-white transition-all duration -500 '>Explore jobs</button>
      </div>
      </div>

    </div>
  )
}

export default Contact;