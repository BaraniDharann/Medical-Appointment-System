import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {
  const { backendUrl, aToken, getAllDoctors } = useContext(AdminContext)
  const [docImg, setDocImg] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: 'General physician',
    degree: '',
    experience: '1 Year',
    about: '',
    fees: '',
    address1: '',
    address2: ''
  })

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const experiences = ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years']

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('speciality', formData.speciality)
      formDataToSend.append('degree', formData.degree)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('about', formData.about)
      formDataToSend.append('fees', formData.fees)
      formDataToSend.append('address', JSON.stringify({ line1: formData.address1, line2: formData.address2 }))
      if (docImg) {
        formDataToSend.append('Image', docImg)
      }

      const token = aToken
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formDataToSend, {
        headers: { atoken: token }
      })

      if (data.message) {
        toast.success(data.message)
        getAllDoctors()
        setDocImg(null)
        setFormData({
          name: '',
          email: '',
          password: '',
          speciality: 'General physician',
          degree: '',
          experience: '1 Year',
          about: '',
          fees: '',
          address1: '',
          address2: ''
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add doctor')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-3 sm:p-6">
      <p className="mb-3 sm:mb-5 text-xl sm:text-2xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white px-4 sm:px-6 lg:px-10 py-6 sm:py-8 border border-gray-200 rounded-xl shadow-sm w-full">
        <div className="flex items-center gap-4 mb-6 sm:mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer group">
            <img
              className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full cursor-pointer border-2 border-dashed border-gray-300 group-hover:border-blue-400 transition-all duration-300 object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />
          <p className="text-sm font-medium text-gray-600">Upload doctor<br />picture</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-5 sm:gap-8 text-gray-700">
          <div className="w-full lg:flex-1 flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Doctor name</label>
              <input
                onChange={handleChange}
                value={formData.name}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="text"
                placeholder="Enter doctor name"
                name="name"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Doctor Email</label>
              <input
                onChange={handleChange}
                value={formData.email}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="email"
                placeholder="doctor@example.com"
                name="email"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Doctor Password</label>
              <input
                onChange={handleChange}
                value={formData.password}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="password"
                placeholder="Enter password"
                name="password"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Experience</label>
              <select
                onChange={handleChange}
                value={formData.experience}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white cursor-pointer"
                name="experience"
              >
                {experiences.map((exp, index) => (
                  <option key={index} value={exp}>{exp}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Fees</label>
              <input
                onChange={handleChange}
                value={formData.fees}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="number"
                placeholder="Consultation fees"
                name="fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Speciality</label>
              <select
                onChange={handleChange}
                value={formData.speciality}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white cursor-pointer"
                name="speciality"
              >
                {specialities.map((spec, index) => (
                  <option key={index} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Education</label>
              <input
                onChange={handleChange}
                value={formData.degree}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="text"
                placeholder="e.g., MBBS, MD"
                name="degree"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                onChange={handleChange}
                value={formData.address1}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="text"
                placeholder="Address line 1"
                name="address1"
                required
              />
              <input
                onChange={handleChange}
                value={formData.address2}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                type="text"
                placeholder="Address line 2"
                name="address2"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">About Doctor</label>
          <textarea
            onChange={handleChange}
            value={formData.about}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
            placeholder="Write about the doctor's expertise and experience..."
            name="about"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-8 sm:px-12 py-3 mt-5 sm:mt-6 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor