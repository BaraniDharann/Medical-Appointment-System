import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
              {/*---left side-----------*/}
        <div>
          <img className='mb-5 w-40'  src={assets.logo} alt="group profiles" />
          <p className='w-full md:w-2/3 text-black-600 leading-6'>We are committed to providing exceptional healthcare services with a team of trusted and experienced doctors. Our mission is to make quality healthcare accessible to everyone through seamless appointment booking and personalized care.</p>

        </div>
        {/*---center side-----------*/}
        <div>
           <p className='text-xl font-medium mb-5'>COMPANY</p>
           <ul className='flex flex-col gap-2 text-black-600'>
            <li className='cursor-pointer hover:text-black' onClick={()=>{navigate('/'); scrollTo(0,0)}}>Home</li>
            <li className='cursor-pointer hover:text-black' onClick={()=>{navigate('/about'); scrollTo(0,0)}}>About us</li>
            <li className='cursor-pointer hover:text-black' onClick={()=>{navigate('/contact'); scrollTo(0,0)}}>Contact us</li>
            <li>Privacy policy</li>
           </ul>

        </div>
        {/*---right side-----------*/}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-black-600'>
            <li>+91 9597955911</li>
            <li>greatstackdev@gamil.com</li>
          </ul>

        </div>
       
        </div>
      {/* ---------copy righs---*/}
      <div>
        <hr />
        <p className='py-5 text-sm text-center '>Copyright 2025@ Prescripto - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer;