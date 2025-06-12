import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Myprofile = () => {

  const [userdata, setuserdata]= useState({
    name:"Saloni Mahajan",
     image: assets.profile_pic,
    email:"abc@gmail.com",
    phone: "+91 7345423533",
    address: {
      line1: "123 abc ",
      line2: "xyz road"
    },
    gender: "female",
    dob: "2004-01-26"
  }
  )

  const [isedit,setisedit]=useState(false);

  return (
    <div className='max-w-lg border p-2 border-gray-200 align-center flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={assets.profile_pic} alt="" />
      {
        isedit?
        <input className='border rounded border-gray-400 my-2 p-2' type="text"  value={userdata.name} onChange={e=>setuserdata (prev=>({...prev, name:e.target.value}))}/>
        : <p>{userdata.name}</p>
      }
      <hr />
      <div>
        <p className='text-bold text-gray-600  mb-2' >CONTACT INFO</p>
        <div className='grid grid-cols-[1fr+3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p>Email id:</p>
          <p>{userdata.email}</p>
          <p>Phone:</p>
          {
        isedit?
        <input className='border rounded border-gray-400  p-2' type="text"  value={userdata.phone} onChange={e=>setuserdata (prev=>({...prev, phone:e.target.value}))}/>
        : <p>{userdata.phone}</p>
          }
          <p>Address:</p>
          {
          isedit?
           <p>
        <input className='border rounded border-gray-400 mb-2  p-2' type="text"  value={userdata.address.line1} onChange={e=>setuserdata (prev=>({...prev, address:{...prev.address, line1:e.target.value}}))}/>
        <br />
      <input className='border rounded border-gray-400  p-2' type="text"  value={userdata.address.line2} onChange={e=>setuserdata (prev=>({...prev, address:{...prev.address, line2:e.target.value}}))}/>  
        </p>
        : <p>{userdata.address.line1} <br /> {userdata.address.line2}</p>
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
        <select value={userdata.gender} onChange={(e)=> setuserdata(prev=>({...prev, gender: e.target.value}))}>
          <option value="Male"></option>
          <option value="Female"></option>
          <option value="Other"></option>
        </select>
        : <p>{userdata.gender}</p>
      }
      <p> Birthday: </p>
      {
        isedit?
        <input className='border rounded border-gray-400  p-2' value={userdata.dob} onChange={(e)=>setuserdata(prev=> ({...prev, dob:e.target.value}))} type="date" />
        : <p>{userdata.dob}</p>
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