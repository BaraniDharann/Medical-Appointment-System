import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DocterContext'

import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

 const {aToken} = useContext(AdminContext)
 const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
            <NavLink
  className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
  to={'/admin-dashboard'}
>
  <img className='w-5 h-5' src={assets.home_icon} alt="Logo" />
  <p className='hidden md:block'>Dashboard</p>
</NavLink>

                 <NavLink   className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
                 to={'/all-appointements'}>
                 <img  className='w-5 h-5' src={assets.appointment_icon} alt="Logo" />
                 <p className='hidden md:block'> Appoinments</p>
                </NavLink>
                 <NavLink   className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
                 to={'/add-doctor'}>
                 <img  className='w-5 h-5' src={assets.add_icon} alt="Logo" />
                 <p className='hidden md:block'>Add Doctor</p>
                </NavLink>
                 <NavLink   className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
                 
                 to={'/doctor-list'}>
                 <img  className='w-5 h-5' src={assets.people_icon} alt="Logo" />
                 <p className='hidden md:block'>Doctors List</p>
                </NavLink>
            </ul>
        }

          {
            dToken && <ul className='text-[#515151] mt-5'>
            <NavLink
  className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
  to={'/doctor-dashboard'}
>
  <img className='w-5 h-5' src={assets.home_icon} alt="Logo" />
  <p className='hidden md:block'>Dashboard</p>
</NavLink>

                 <NavLink   className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
                 to={'/doctor-appointments'}>
                 <img  className='w-5 h-5' src={assets.appointment_icon} alt="Logo" />
                 <p className='hidden md:block'> Appoinments</p>
                </NavLink>
                 <NavLink   className={({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`
  }
              
                 
                 to={'/doctor-profile'}>
                 <img  className='w-5 h-5' src={assets.people_icon} alt="Logo" />
                 <p className='hidden md:block'>profile</p>
                </NavLink>
            </ul>
        }




    </div>
  )
}

export default Sidebar