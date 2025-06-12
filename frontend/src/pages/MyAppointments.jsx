import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const {doctors}= useContext(AppContext);


  return (
    <div>
      <p className='pb-3 mt-12 text-xl text-semibold'>My Appointments</p>
      <div>
       {doctors.slice(0,3).map((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <img className='w-32 bg-indigo-50' src={item.image} alt="" />
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold' >{item.name}</p>
            <p>{item.speciality }</p>
            <p className='text-zinc-700 font-medium mt-1' >Address:</p>
            <p className='text-xs' >{item.address.line1}</p>
            <p className='text-xs'>{item.address.line2}</p>
            <p  className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium' >Date and Time:</span></p>
          </div>
          <div className='flex flex-col gap-2 justify-end'>
          
          <button className=' sm:min-w-48 mb-1 p-2 text-sm bg-green-700 border text-white  border-green-400 hover:bg-green-200 hover:text-black'>
            Pay online</button>
            <button className=' sm:min-w-48 p-2 border text-sm bg-red-700 text-white border-red-400  hover:bg-red-200 hover:text-black'> Cancel Appointment</button> 
            </div>
        </div>
       ))}
      </div>
    </div>
  )
}

export default MyAppointments