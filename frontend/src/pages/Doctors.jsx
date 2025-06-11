import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const {speciality} = useParams( ) 
  const navigate= useNavigate()

  const {doctors}= useContext(AppContext)

  const [filterDoc, setfilterDoc] = useState([]);
  
  const applyfilter=()=>{
    if(speciality){
      setfilterDoc(doctors.filter(doc=>doc.speciality=== speciality))
    } else{
      setfilterDoc(doctors); 
    }
  }

  useEffect(()=>{
    applyfilter();
  },[doctors, speciality])

  return (
    <div>
      <p className='text-gray-900'>
        Browse Through the doctors  
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className=' flex flex-col gap-4 text-sm text-teal-900'>
          
           <p onClick={()=>speciality==='general physician'? navigate('/doctors'): navigate('/doctors/General physician')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-teal-500 rounded-lg transition-all cursor-pointer 
            ${speciality==="General physician" ? "bg-indigo-50 text-black" : "" }`} >General Physician</p>
           
           
           <p onClick={()=>speciality==='Gynecologist'? navigate('/doctors'): navigate('/doctors/Gynecologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-teal-500 rounded-lg transition-all cursor-pointer 
            ${speciality==="Gynecologist" ? "bg-indigo-50 text-black" : "" }`}>Gynecologist</p>
           
           <p onClick={()=>speciality==='Dermatologist'? navigate('/doctors'): navigate('/doctors/Dermatologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-teal-500 rounded-lg transition-all cursor-pointer 
            ${speciality==="Dermatologist" ? "bg-indigo-50 text-black" : "" } `}>Dermatologist</p>
           
           <p onClick={()=>speciality==='Pediatricians'? navigate('/doctors'): navigate('/doctors/Pediatricians')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-teal-500 rounded-lg transition-all cursor-pointer 
            ${speciality==="Pediatricians" ? "bg-indigo-50 text-black" : "" }`}>Pediatricians</p>
           
           <p onClick={()=>speciality==='Gastroenterologist'? navigate('/doctors'): navigate('/doctors/Gastroenterologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-teal-500 rounded-lg transition-all cursor-pointer 
            ${speciality==="Gastroenterologist" ? "bg-indigo-50 text-black" : "" }`}>Gastroenterologist</p>
           
           <p onClick={()=>speciality==='Neurologist'? navigate('/doctors'): navigate('/doctors/Neurologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-teal-500 rounded-lg transition-all cursor-pointer 
            ${speciality==="Neurologist" ? "bg-indigo-50 text-black" : "" }`}>Neurologist</p>
        </div>
        <div className=' w-full grid grid-cols-auto gap-4 gap-y-6 '>
          {
            filterDoc.map(((item, index)=>(
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
            )))
}
        </div>
      </div>
    </div>
  )
}

export default Doctors