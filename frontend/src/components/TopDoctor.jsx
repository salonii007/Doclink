import React, { useContext } from 'react'
// import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctor = () => {
    const navigate= useNavigate();

    const {doctors}= useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-grat-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>TOP DOCTORS TO BOOK</h1>
        <p className='sm:w-1/3 text-center text-sm'>Consult from the top rated doctors</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item, index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} 
                className='border border-teal-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500' key={index}>
                    <img className='bg-teal-50 ' src={item.image} />
                    <div className='p-4' >
                        <div className='flex items-center gap-2 text-center text-sm text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'> </p> <p>Available</p>
                        </div>
                        <p className='text-teal-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-teal-700 text-sm ' >{item.speciality}</p>
                    </div>
                    </div>
            ))}
        </div>
        <button onClick={ ()=> {navigate('/doctors'); scrollTo(0)}}
         className='py-3 px-8 bg-primary text-white rounded-lg' >more</button>
    </div>
  )
}

export default TopDoctor