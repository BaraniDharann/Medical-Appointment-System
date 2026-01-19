
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider, { AdminContext } from './context/AdminContext'
import DoctorcontextProvider from './context/DocterContext'
import AppcontextProvider from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorcontextProvider>
         <AppcontextProvider>
                   <App />
</AppcontextProvider>


        </DoctorcontextProvider>
  </AdminContextProvider>
  
   
     
  </BrowserRouter>,
)
