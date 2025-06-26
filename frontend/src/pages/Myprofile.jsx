import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Myprofile = () => {

  const {userData, setUserData} = useContext(AppContext)

  const [isedit,setisedit]=useState(false);

  return userData && (
    <div className='max-w-lg border p-2 border-gray-200 align-center flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      {
        isedit?
        <input className='border rounded border-gray-400 my-2 p-2' type="text"  value={userData.name} onChange={e=>setUserData (prev=>({...prev, name:e.target.value}))}/>
        : <p>{userData.name}</p>
      }
      <hr />
      <div>
        <p className='text-bold text-gray-600  mb-2' >CONTACT INFO</p>
        <div className='grid grid-cols-[1fr+3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone:</p>
          {
        isedit?
        <input className='border rounded border-gray-400  p-2' type="text"  value={userData.phone} onChange={e=>setUserData (prev=>({...prev, phone:e.target.value}))}/>
        : <p>{userData.phone}</p>
          }
          <p>Address:</p>
          {
          isedit?
           <p>
        <input className='border rounded border-gray-400 mb-2  p-2' type="text"  value={userData.address.line1} onChange={e=>setUserData (prev=>({...prev, address:{...prev.address, line1:e.target.value}}))}/>
        <br />
      <input className='border rounded border-gray-400  p-2' type="text"  value={userData.address.line2} onChange={e=>setUserData (prev=>({...prev, address:{...prev.address, line2:e.target.value}}))}/>  
        </p>
        : <p>{userData.address.line1} <br /> {userData.address.line2}</p>
          }
        </div>
      </div>
      <div>
         <p className='text-bold text-gray-600  mb-2'>BASIC INFORMATION</p>
         <div className='grid grid-cols-[1fr+3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p>Gender: 
          </p> 
            {
        isedit?
        <select value={userData.gender} onChange={(e)=> setUserData(prev=>({...prev, gender: e.target.value}))}>
          <option value="Male"></option>
          <option value="Female"></option>
          <option value="Other"></option>
        </select>
        : <p>{userData.gender}</p>
      }
      <p> Birthday: </p>
      {
        isedit?
        <input className='border rounded border-gray-400  p-2' value={userData.dob} onChange={(e)=>setUserData(prev=> ({...prev, dob:e.target.value}))} type="date" />
        : <p>{userData.dob}</p>
      }
         </div>

      </div>
      {
        isedit?
        <button className='w-20 p-2 bg-primary text-white rounded' onClick={()=>setisedit(false)}>Save Info</button>
        : <button className='w-20 p-2 bg-primary text-white rounded' onClick={()=>setisedit(true)}>Edit</button>      }


    </div>
  )
}

export default Myprofile