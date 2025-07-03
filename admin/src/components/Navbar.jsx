import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken, setatoken} = useContext(AdminContext)
    const {dToken, setdToken}= useContext(DoctorContext)
    const navigate= useNavigate()

    const logout =()=>{
        navigate('/')
        aToken && setatoken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setdToken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className= 'w-36 sm:w-40 cursor-pointer ' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-teal-400 text-teal-800'>
                {
                    aToken? 'Admin' : 'Doctor'
                }

            </p>

        </div>
        <button onClick={logout} className='cursor-pointer bg-primary text-white text-sm rounded-xl px-10 py-2'>Logout</button>

    </div>
  )
}

export default Navbar