import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvaliablity, backendUrl } = useContext(AdminContext)
  const [showModal, setShowModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [formData, setFormData] = useState({})
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const openModal = (doctor) => {
    setSelectedDoctor(doctor)
    setFormData({
      name: doctor.name,
      email: doctor.email,
      speciality: doctor.speciality,
      degree: doctor.degree,
      experience: doctor.experience,
      about: doctor.about,
      fees: doctor.fees,
      address: doctor.address,
      available: doctor.available
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedDoctor(null)
    setImage(null)
  }

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('doctorId', selectedDoctor._id)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('speciality', formData.speciality)
      formDataToSend.append('degree', formData.degree)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('about', formData.about)
      formDataToSend.append('fees', formData.fees)
      formDataToSend.append('address', JSON.stringify(formData.address))
      formDataToSend.append('available', formData.available)
      if (image) formDataToSend.append('Image', image)

      const { data } = await axios.post(backendUrl + '/api/admin/update-doctor', formDataToSend, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
        closeModal()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/delete-doctor', { doctorId: selectedDoctor._id }, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
        closeModal()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='m-3 sm:m-5 w-full'>
      <h1 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-5'>All Doctors</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6 pb-10'>
        {doctors.map((doctor, index) => (
          <div key={index} onClick={() => openModal(doctor)} className='border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white'>
            <div className='bg-gradient-to-b from-blue-50 to-white h-56 sm:h-64 flex items-end justify-center overflow-hidden'>
              <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={doctor.Image} alt={doctor.name} />
            </div>
            <div className='p-4'>
              <p className='text-gray-900 text-base sm:text-lg font-semibold'>{doctor.name}</p>
              <p className='text-gray-600 text-sm mt-1'>{doctor.speciality}</p>
              <div className='flex items-center gap-2 mt-3'>
                <input onChange={(e) => { e.stopPropagation(); changeAvaliablity(doctor._id) }} type='checkbox' checked={doctor.available} readOnly className='w-4 h-4 accent-blue-600' />
                <p className='text-gray-500 text-sm'>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedDoctor && (
        <div className='fixed inset-0 flex items-end sm:items-center justify-center z-50' onClick={closeModal}>
          <div className='bg-white/95 backdrop-blur-md w-full sm:w-[90%] md:w-[600px] max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <div className='sticky top-0 bg-white/90 backdrop-blur-sm border-b p-4 flex justify-between items-center'>
              <h2 className='text-lg sm:text-xl font-semibold'>Doctor Details</h2>
              <button onClick={closeModal} className='text-2xl text-gray-500 hover:text-gray-700'>&times;</button>
            </div>
            
            <div className='p-4 sm:p-6 space-y-4'>
              <div className='flex justify-center'>
                <div className='relative'>
                  <img src={image ? URL.createObjectURL(image) : selectedDoctor.Image} alt='' className='w-32 h-32 rounded-full object-cover' />
                  <label htmlFor='doc-img' className='absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg>
                  </label>
                  <input onChange={(e) => setImage(e.target.files[0])} type='file' id='doc-img' hidden />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm text-gray-600'>Name</label>
                  <input type='text' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' />
                </div>
                <div>
                  <label className='text-sm text-gray-600'>Email</label>
                  <input type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' />
                </div>
                <div>
                  <label className='text-sm text-gray-600'>Speciality</label>
                  <input type='text' value={formData.speciality} onChange={(e) => setFormData({ ...formData, speciality: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' />
                </div>
                <div>
                  <label className='text-sm text-gray-600'>Degree</label>
                  <input type='text' value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' />
                </div>
                <div>
                  <label className='text-sm text-gray-600'>Experience</label>
                  <input type='text' value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' />
                </div>
                <div>
                  <label className='text-sm text-gray-600'>Fees</label>
                  <input type='number' value={formData.fees} onChange={(e) => setFormData({ ...formData, fees: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' />
                </div>
              </div>

              <div>
                <label className='text-sm text-gray-600'>About</label>
                <textarea value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} className='w-full border rounded px-3 py-2 mt-1' rows='3' />
              </div>

              <div>
                <label className='text-sm text-gray-600'>Address</label>
                <input type='text' value={formData.address?.line1 || ''} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line1: e.target.value } })} placeholder='Line 1' className='w-full border rounded px-3 py-2 mt-1 mb-2' />
                <input type='text' value={formData.address?.line2 || ''} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line2: e.target.value } })} placeholder='Line 2' className='w-full border rounded px-3 py-2' />
              </div>

              <div className='flex items-center gap-2'>
                <input type='checkbox' checked={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.checked })} className='w-4 h-4' />
                <label className='text-sm text-gray-600'>Available</label>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                <button onClick={handleUpdate} className='flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium'>Update</button>
                <button onClick={handleDelete} className='flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorsList
