import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DocterContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {dToken, getprofile, profiledata, updateProfile, setProfile} = useContext(DoctorContext);
  const {currency, backendUrl} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if(dToken){
      profiledata()
    }
  }, [dToken])

  const updateProfileData = async () => {
    const formData = new FormData()
    formData.append('name', getprofile.name)
    formData.append('speciality', getprofile.speciality)
    formData.append('degree', getprofile.degree)
    formData.append('experience', getprofile.experience)
    formData.append('about', getprofile.about)
    formData.append('fees', getprofile.fees)
    formData.append('address', JSON.stringify(getprofile.address))
    formData.append('available', getprofile.available)
    
    const success = await updateProfile(formData)
    if(success){
      setIsEdit(false)
    }
  }

  return getprofile && (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-2 sm:px-4 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='md:flex'>
            <div className='md:flex-shrink-0 md:w-80 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-6 sm:p-8'>
              <img className='w-full max-w-[200px] sm:max-w-xs rounded-xl shadow-lg object-cover' src={getprofile.Image} alt="Doctor Profile" />
            </div>
            <div className='p-4 sm:p-8 md:p-10 flex-1'>
        
              {isEdit ? (
                <input 
                  className='w-full bg-gray-50 text-xl sm:text-2xl md:text-3xl font-bold border-2 border-primary/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-primary transition-colors' 
                  type="text" 
                  value={getprofile.name} 
                  onChange={(e) => getprofile.name = e.target.value}
                />
              ) : (
                <h1 className='font-bold text-xl sm:text-2xl md:text-4xl text-gray-800 mb-2'>{getprofile.name}</h1>
              )}

              <div className='flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
                {isEdit ? (
                  <input 
                    className='bg-gray-50 border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:border-primary' 
                    type="text" 
                    value={getprofile.degree} 
                    onChange={(e) => getprofile.degree = e.target.value}
                  />
                ) : (
                  <>
                    <span className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary font-semibold rounded-full text-xs sm:text-sm'>
                      {getprofile.degree}
                    </span>
                    <span className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-full text-xs sm:text-sm'>
                      {getprofile.speciality}
                    </span>
                  </>
                )}
                <span className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 font-semibold rounded-full text-xs sm:text-sm'>
                  {getprofile.experience}
                </span>
              </div>

              <div className='mb-4 sm:mb-6'>
                <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-2'>About</h3>
                {isEdit ? (
                  <textarea 
                    className='w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors' 
                    rows={5} 
                    value={getprofile.about} 
                    onChange={(e) => getprofile.about = e.target.value}
                  />
                ) : (
                  <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>{getprofile.about}</p>
                )}
              </div>

              <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200'>
                <p className='text-gray-700 font-semibold text-base sm:text-lg'>
                  Appointment Fee: 
                  {isEdit ? (
                    <input 
                      className='bg-white border-2 border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 ml-2 w-24 sm:w-32 text-sm focus:outline-none focus:border-primary' 
                      type="number" 
                      value={getprofile.fees} 
                      onChange={(e) => getprofile.fees = e.target.value}
                    />
                  ) : (
                    <span className='text-green-600 ml-2'>{currency}{getprofile.fees}</span>
                  )}
                </p>
              </div>

              <div className='mb-4 sm:mb-6'>
                <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-2'>Address</h3>
                {isEdit ? (
                  <div className='flex flex-col gap-3'>
                    <input 
                      className='bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary' 
                      type="text" 
                      placeholder="Address Line 1"
                      value={getprofile.address.line1} 
                      onChange={(e) => getprofile.address.line1 = e.target.value}
                    />
                    <input 
                      className='bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary' 
                      type="text" 
                      placeholder="Address Line 2"
                      value={getprofile.address.line2} 
                      onChange={(e) => getprofile.address.line2 = e.target.value}
                    />
                  </div>
                ) : (
                  <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
                    {getprofile.address.line1}<br />{getprofile.address.line2}
                  </p>
                )}
              </div>

              <div className='flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 rounded-lg'>
                <input 
                  type="checkbox" 
                  id="available"
                  className='w-4 h-4 sm:w-5 sm:h-5 text-primary rounded focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                  checked={getprofile.available} 
                  disabled={!isEdit}
                  onChange={() => setProfile({...getprofile, available: !getprofile.available})}
                />
                <label htmlFor="available" className='text-gray-700 font-medium cursor-pointer text-sm sm:text-base'>Available for Appointments</label>
              </div>

              <div className='flex gap-4 flex-wrap'>
                {isEdit ? (
                  <>
                    <button 
                      className='flex-1 min-w-[100px] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary  font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg' 
                      onClick={updateProfileData}
                    >
                      Save Changes
                    </button>
                    <button 
                      className='flex-1 min-w-[100px] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all' 
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    className='flex-1 min-w-[100px] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-blue font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg' 
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
