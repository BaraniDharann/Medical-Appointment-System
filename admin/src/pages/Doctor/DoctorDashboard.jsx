import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DocterContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

 const {dToken, dashData, getDashboard, appoinments, getAppoinment}=useContext(DoctorContext)


  useEffect(() => {
    if (dToken) {
      getDashboard()
      getAppoinment()
    }
  }, [dToken])
  
  return (
  <div className='m-2 sm:m-5 w-full px-2 sm:px-0'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8'>
          {dashData && (
            <>
              <div className='flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300'>
                <img className='w-10 h-10 sm:w-14 sm:h-14' src={assets.earning_icon} alt='Earnings' />
                <div>
                  <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>${dashData.earnings || 0}</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>Earnings</p>
                </div>
              </div>
              <div className='flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300'>
                <img className='w-10 h-10 sm:w-14 sm:h-14' src={assets.appointments_icon} alt='Appointments' />
                <div>
                  <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>{dashData.appoinments || 0}</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>Appointments</p>
                </div>
              </div>
              <div className='flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300'>
                <img className='w-10 h-10 sm:w-14 sm:h-14' src={assets.patients_icon} alt='Patients' />
                <div>
                  <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>{dashData.patients || 0}</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>Patients</p>
                </div>
              </div>
            </>
          )}
        </div>
  
        <div className='bg-white rounded-lg border border-gray-200 p-4 sm:p-6'>
          <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
            <img className='w-5 h-5 sm:w-6 sm:h-6' src={assets.list_icon} alt='' />
            <p className='text-lg sm:text-xl font-semibold text-gray-800'>Latest Bookings</p>
          </div>
          <div className='space-y-3 sm:space-y-4'>
            {appoinments.slice(0, 5).reverse().map((item, index) => {
              return (
                <div key={index} className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors'>
                  <div className='flex items-center gap-2 sm:gap-4 flex-1 min-w-0'>
                    <img className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200 flex-shrink-0' src={item.userData.Image} alt='' />
                    <div className='min-w-0 flex-1'>
                      <p className='text-gray-900 font-semibold text-sm sm:text-base truncate'>{item.userData.name}</p>
                      <p className='text-gray-500 text-xs sm:text-sm truncate'>{item.slotDate}, {item.slotTime}</p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <p className='text-red-500 text-xs sm:text-sm font-medium ml-2 flex-shrink-0'>Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className='text-green-500 text-xs sm:text-sm font-medium ml-2 flex-shrink-0'>Completed</p>
                  ) : (
                    <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors ml-2 flex-shrink-0'>
                      <span className='text-red-500 text-lg sm:text-xl'>×</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}

export default DoctorDashboard
