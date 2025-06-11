import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-16 '>
        <h1 className='text-3xl font-medium text-teal-800'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center'>Simply browse through our extensive list of trusted doctors and schedule <br/> your appointment hassle-free</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-4 transition-all duration-500 ' to={`/doctors/${item.speciality}`} key={index}>
                    <img className='w-16 sm:w-24 mb-2 ' src={item.image}/>
                    <p>{item.speciality} </p>

                </Link>
            ))}
        </div>


    </div>
  )
}

export default Speciality