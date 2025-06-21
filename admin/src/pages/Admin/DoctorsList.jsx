import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorsList = () => {

  const {doctors, aToken, getAllDoctors, changeAvailablity}= useContext(AdminContext)

  useEffect(()=>{
    if(aToken)
    {
      console.log("here");
      
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5  max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium' >All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6 '>
        {
           Array.isArray(doctors) && doctors.length > 0 ?(
          
          
          doctors.map((item,index)=>(
            <div className='border border-teal-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index} >
              <img className='bg-teal-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4 '>
                <p className='text-neutral-800 text-lg font-medium' >{item.name}</p>
                <p className='text-zinc-600 text-sm '> {item.speciality} </p>
                <div className='mt-2 flex items-center gap-1 text-sm '>
                  <input onChange={()=> changeAvailablity(item._id)}
                   type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))) : (
            <p className='mt-8 m-4 text-xl text-teal-500'>No doctor found</p>
          )
}

          
        
      </div>

    </div>
  )
}

export default DoctorsList