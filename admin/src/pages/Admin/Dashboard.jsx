import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { aToken, getDashboardData, dashData, appoinments, getAppoinments } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashboardData()
      getAppoinments()
    }
  }, [aToken])

  const dashboardData = [
    { icon: assets.doctor_icon, count: dashData?.doctors || 0, label: 'Doctors', path: '/doctor-list' },
    { icon: assets.appointments_icon, count: dashData?.appoinments || 0, label: 'Appointments', path: '/all-appointements' },
    { icon: assets.patients_icon, count: dashData?.patients || 0, label: 'Patients', path: '/all-appointements' }
  ]

  return (
    <div className='m-3 sm:m-5 w-full'>
      <div className='flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8'>
        {dashboardData.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} className='flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex-1 min-w-[160px] sm:min-w-[200px]'>
            <img className='w-12 h-12 sm:w-14 sm:h-14' src={item.icon} alt={item.label} />
            <div>
              <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>{item.count}</p>
              <p className='text-gray-500 text-xs sm:text-sm mt-1'>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white rounded-lg border border-gray-200 p-4 sm:p-6'>
        <div className='flex items-center gap-3 mb-4 sm:mb-6'>
          <img className='w-5 h-5 sm:w-6 sm:h-6' src={assets.list_icon} alt='' />
          <p className='text-lg sm:text-xl font-semibold text-gray-800'>Latest Appointment</p>
        </div>
        <div className='space-y-3 sm:space-y-4'>
          {appoinments.slice(0, 5).reverse().map((item, index) => {
            return (
              <div key={index} className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors'>
                <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                  <img className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200 flex-shrink-0' src={item.docData.Image} alt='' />
                  <div className='min-w-0'>
                    <p className='text-gray-900 font-semibold text-sm sm:text-base truncate'>{item.docData.name}</p>
                    <p className='text-gray-500 text-xs sm:text-sm truncate'>{item.slotDate}, {item.slotTime}</p>
                  </div>
                </div>
                {item.cancelled ? (
                  <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0'>
                    <img className='w-4 h-4 sm:w-5 sm:h-5' src={assets.cancel_icon} alt='' />
                  </div>
                ) : item.isCompleted ? (
                  <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0'>
                    <img className='w-4 h-4 sm:w-5 sm:h-5' src={assets.tick_icon} alt='' />
                  </div>
                ) : (
                  <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors flex-shrink-0'>
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

export default Dashboard