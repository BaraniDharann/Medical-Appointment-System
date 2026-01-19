import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Login from './pages/Login'
import About from'./pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import Navbar from './componments/Navbar'
import Footer from './componments/Footer'
import { ToastContainer, toast } from 'react-toastify';
  

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer/>
      <Navbar/>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
         
         <Route path='/doctors/:speciality' element={<Doctors />} />  {/* ✅ dynamic route */}
           <Route path='/login' element={<Login/>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route path='/my-profile' element={<MyProfile/>}/>
           <Route path='/my-appointments' element={<MyAppointments/>}/>
           <Route path='/appointment/:docId' element={<Appointment/>}/>
         </Routes>
         <Footer/>
    </div>
  )
}

export default App;