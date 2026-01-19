import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const AllAppoinments = () => {
  const { aToken, getAppoinments, appoinments, backendUrl, setAppoinments } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAppoinments()
    }
  }, [aToken])

  // Debug log to see the actual data structure
  useEffect(() => {
    if (appoinments && appoinments.length > 0) {
      console.log('First appointment data:', appoinments[0])
      console.log('User data:', appoinments[0]?.userData)
      console.log('Slot date:', appoinments[0]?.slotDate)
      console.log('Slot time:', appoinments[0]?.slotTime)
    }
  }, [appoinments])

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/cancel-appointment',
        { appointmentId },
        { headers: { atoken: aToken } }
      )
      if (data.success) {
        toast.success(data.message)
        getAppoinments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const calculateAge = (dob) => {
    if (!dob || dob === 'Not Specified') return 'N/A'
    const birthDate = new Date(dob)
    if (isNaN(birthDate.getTime())) return 'N/A'
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const formatDate = (slotDate, slotTime) => {
    if (!slotDate) return 'N/A'
    
    // Parse the "day_month_year" format (e.g., "1_12_2024")
    if (typeof slotDate === 'string' && slotDate.includes('_')) {
      const parts = slotDate.split('_')
      if (parts.length === 3) {
        const [day, month, year] = parts
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthIndex = parseInt(month) - 1
        if (monthIndex >= 0 && monthIndex < 12) {
          return `${day} ${months[monthIndex]} ${year}${slotTime ? ', ' + slotTime : ''}`
        }
      }
    }
    
    // Fallback: try to parse as Date object
    const date = new Date(slotDate)
    if (isNaN(date.getTime())) return 'N/A'
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}${slotTime ? ', ' + slotTime : ''}`
  }

  return (
    <div className='w-full max-w-7xl m-2 sm:m-5'>
      <p className='mb-3 sm:mb-5 text-xl sm:text-2xl font-semibold text-gray-800 px-2 sm:px-0'>All Appointments</p>
      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        {/* Desktop Header */}
        <div className='hidden lg:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1.5fr_1fr] gap-2 py-4 px-6 border-b bg-gray-50 text-sm font-medium text-gray-600'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appoinments.reverse().map((item, index) => (
          <div key={index}>
            {/* Desktop View */}
            <div className='hidden lg:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1.5fr_1fr] gap-2 py-4 px-6 border-b hover:bg-gray-50 transition-colors items-center text-sm text-gray-700'>
              <p className='text-gray-500'>{index + 1}</p>
              <div className='flex items-center gap-3'>
                <img className='w-10 h-10 rounded-full object-cover border border-gray-200' src={item.userData.Image} alt='' />
                <p className='font-medium text-gray-800'>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData?.dob)}</p>
              <p className='text-gray-600'>{formatDate(item.slotDate, item.slotTime)}</p>
              <div className='flex items-center gap-3'>
                <img className='w-10 h-10 rounded-full object-cover border border-gray-200 bg-blue-50' src={item.docData.Image} alt='' />
                <p className='font-medium text-gray-800'>{item.docData.name}</p>
              </div>
              <p className='font-semibold text-gray-800'>${item.amount}</p>
              <div>
                {item.cancelled ? (
                  <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-medium'>Completed</p>
                ) : (
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer hover:scale-110 transition-transform' src={assets.cancel_icon} alt='Cancel' />
                )}
              </div>
            </div>
            {/* Mobile/Tablet View */}
            <div className='lg:hidden p-4 border-b hover:bg-gray-50 transition-colors'>
              <div className='flex justify-between items-start mb-3'>
                <span className='text-xs font-semibold text-gray-500'>#{index + 1}</span>
                <div>
                  {item.cancelled ? (
                    <span className='text-red-500 text-xs font-medium px-2 py-1 bg-red-50 rounded'>Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className='text-green-500 text-xs font-medium px-2 py-1 bg-green-50 rounded'>Completed</span>
                  ) : (
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-transform' src={assets.cancel_icon} alt='Cancel' />
                  )}
                </div>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <img className='w-12 h-12 rounded-full object-cover border border-gray-200' src={item.userData.Image} alt='' />
                  <div>
                    <p className='font-semibold text-gray-800'>{item.userData.name}</p>
                    <p className='text-xs text-gray-500'>Age: {calculateAge(item.userData?.dob)}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 pl-1'>
                  <img className='w-10 h-10 rounded-full object-cover border border-gray-200 bg-blue-50' src={item.docData.Image} alt='' />
                  <div>
                    <p className='text-xs text-gray-500'>Doctor</p>
                    <p className='font-medium text-gray-800'>{item.docData.name}</p>
                  </div>
                </div>
                <div className='flex justify-between items-center pt-2 border-t'>
                  <div>
                    <p className='text-xs text-gray-500'>Date & Time</p>
                    <p className='text-sm text-gray-700'>{formatDate(item.slotDate, item.slotTime)}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs text-gray-500'>Fees</p>
                    <p className='text-lg font-semibold text-gray-800'>${item.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppoinments