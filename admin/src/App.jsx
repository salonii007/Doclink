import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
  

const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      
     
    </div>
  ) : (
    <>
     <Login/>
      <ToastContainer/>
    </>
  )

}

export default App