import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
import Myprofile from './pages/Myprofile';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const App = () => {
  return (
  <div className=' mx-3 sm:mx-[10%] mb-4 sm:mb-[10%]'>

    <Navbar/> 
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/doctors' element={<Doctors/>} />
      <Route path='/doctors/:speciality' element={<Doctors/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/myprofile' element={<Myprofile/>} />
      <Route path='/myappointment' element={<MyAppointments/>} />
      
      <Route path="/appointment/:docId" element={<Appointment/>} />
    </Routes>
    <Footer/>
    </div>
  )
}
export default App;