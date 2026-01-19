import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppoinments from './pages/Admin/AllAppoinments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DocterContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppoinment from './pages/Doctor/DoctorAppoinment';

const App = () => {

  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  return (
    <div className='bg-[#F8F9FD]'>
      {aToken  || dToken ? (
        <>
          <ToastContainer />
          <Navbar/>
          <div className='flex items-start'>
             <Sidebar/>
             <Routes>
              {/* admin routes */}
              
              <Route path='/' element={<></>}/>
              <Route path='/admin-dashboard' element={<Dashboard/>}/>
               <Route path='/all-appointements' element={<AllAppoinments/>}/>
                <Route path='/add-doctor' element={<AddDoctor/>}/>
                 <Route path='/doctor-list' element={<DoctorsList/>}/>
            {/* doctor routes */}
                 
                 <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
                 <Route path='/doctor-profile' element={<DoctorProfile/>}/>
                 <Route path='/doctor-appointments' element={<DoctorAppoinment/>}/>
             </Routes>
          </div>
        </>
      ) : (
        <>
          <Login />
          <ToastContainer />
        </>
      )}
    </div>
  )
}

export default App;
