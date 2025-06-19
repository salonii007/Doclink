import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { Routes,Route } from 'react-router-dom';
 

const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <Navbar/>
      <div className='flex items-start'>
        <SideMenu/>
        <Routes>
          <Route path='/' element={<></>}/>
           <Route path='/admin-dashboard' element={<Dashboard/>}/>
            <Route path='/all-appointments' element={<AllAppointments/>}/>
         <Route path='/add-doctor' element={<AddDoctor/>}/>
        <Route path='/doctor-list' element={<DoctorsList/>}/>
        </Routes>
        
      </div>
      
     
    </div>
  ) : (
    <>
     <Login/>
      <ToastContainer/>
    </>
  )

}

export default App