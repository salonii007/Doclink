import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId, speciality}) => {
    const{doctors}= useContext(AppContext)
    const navigate = useNavigate()
    const [reldoctors, setreldoctors]= useState([]);

    useEffect(()=>{
        if(doctors.length>0 && speciality)
        {
            const doctorsdata= doctors.filter((doc)=> doc.speciality===speciality && doc._id !== docId)//to remove current doctor
            setreldoctors(doctorsdata)
        }
    }, [doctors, speciality, docId])


  return (
    
        <div className='flex flex-col items-center gap-4 my-16 text-grat-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related doctors</h1>
        {/* <p className='sm:w-1/3 text-center text-sm'>Consult from the top rated doctors</p> */}
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {reldoctors.slice(0,5).map((item, index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} 
                className='border border-teal-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500' key={index}>
                    <img className='bg-teal-50 ' src={item.image} />
                    <div className='p-4' >
                         <div className={`flex items-center gap-2 text-center text-sm  ${item.available? 'text-green-500': "text-gray-500"}`}>
                            <p className={`w-2 h-2 ${item.available? 'bg-green-500': "bg-gray-500"}rounded-full`}> </p> <p>{ item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                       <p className='text-teal-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-teal-700 text-sm ' >{item.speciality}</p>
                    </div>
                    </div>
            ))}
            
                    </div>



    </div>
  )
}

export default RelatedDoctors