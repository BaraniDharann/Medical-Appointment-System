import React, { useEffect, useContext } from 'react'
import { DoctorContext } from '../../context/DocterContext'
import { assets } from '../../assets/assets'

const DoctorAppoinment = () => {

  const { dToken, appoinments, getAppoinment, completeAppointment, cancelAppointment } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppoinment()
    }
  }, [dToken])

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

  return (
    <div className='w-full max-w-6xl m-2 sm:m-5 px-2 sm:px-0'>
      <p className='mb-3 text-base sm:text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-xs sm:text-sm overflow-x-auto'>
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appoinments && appoinments.length > 0 ? appoinments.map((item, index) => (
          <div key={index}>
            <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b hover:bg-gray-50'>
            <p className='text-gray-600'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full' src={item.userData.Image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p>
              <span className='inline-block px-2 py-1 text-xs border border-primary rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </span>
            </p>
            <p className='text-gray-600'>{calculateAge(item.userData?.dob)}</p>
            <p className='text-gray-600'>{item.slotDate}, {item.slotTime}</p>
            <p className='text-gray-600'>${item.amount}</p>
            <div className='flex gap-2'>
              {item.cancelled ? (
                <p className='text-red-500 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </>
              )}
            </div>
          </div>

            <div className='md:hidden p-4 border-b hover:bg-gray-50'>
              <div className='flex items-start gap-3 mb-3'>
                <span className='text-gray-500 font-medium min-w-[20px]'>{index + 1}</span>
                <img className='w-12 h-12 rounded-full' src={item.userData.Image} alt="" />
                <div className='flex-1'>
                  <p className='font-medium text-sm'>{item.userData.name}</p>
                  <p className='text-gray-500 text-xs mt-1'>Age: {calculateAge(item.userData?.dob)}</p>
                </div>
              </div>
              <div className='ml-8 space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 text-xs'>Payment:</span>
                  <span className='inline-block px-2 py-1 text-xs border border-primary rounded-full'>
                    {item.payment ? 'Online' : 'CASH'}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 text-xs'>Date & Time:</span>
                  <span className='text-gray-800 text-xs'>{item.slotDate}, {item.slotTime}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 text-xs'>Fees:</span>
                  <span className='text-gray-800 text-xs font-medium'>${item.amount}</span>
                </div>
                <div className='flex justify-between items-center pt-2'>
                  <span className='text-gray-600 text-xs'>Action:</span>
                  <div className='flex gap-2'>
                    {item.cancelled ? (
                      <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                    ) : item.isCompleted ? (
                      <p className='text-green-500 text-xs font-medium'>Completed</p>
                    ) : (
                      <>
                        <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer' src={assets.tick_icon} alt="" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <p className='py-4 px-4 sm:px-6 text-gray-500 text-center'>No appointments found</p>
        )}
      </div>
    </div>
  )
}

export default DoctorAppoinment
