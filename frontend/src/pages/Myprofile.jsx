import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';


const Myprofile = () => {

  const {userData, setUserData, token , backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isedit,setisedit]=useState(false);
   const [image, setimage]= useState(false)

   const updateuserprofiledata= async ()=>{
    // 
    try {
      const formData= new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      formData.append('address', JSON.stringify(userData.address))
      image && formData.append('image', image)//becoz image is an optional field 

      const {data}= await axios.post(backendUrl + '/api/user/edit-profile', formData, {headers: {token}})

      if(data.success)
      {
        toast.success(data.message)
        await loadUserProfileData
        setisedit(false)
        setimage(false)
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   }

  return userData && (
    <div className='max-w-lg border p-2 border-gray-200 align-center flex flex-col gap-2 text-sm'>
      {
        isedit?
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-70' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>{setimage(e.target.files[0])}} type="file"  id="image" hidden/>
        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
     
      }
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
        <input className='border rounded border-gray-400  p-2' value={userData.dob ? userData.dob.substring(0, 10) : ""}
  onChange={(e) =>
    setUserData((prev) => ({ ...prev, dob: e.target.value }))
  } type="date" />
        : <p>{userData.dob}</p>
      }
         </div>

      </div>
      {
        isedit?
        <button  className='w-20 p-2 bg-primary text-white rounded' onClick={()=>updateuserprofiledata()}>Save Info</button>
        : <button className='w-20 p-2 bg-primary text-white rounded' onClick={()=>setisedit(true)}>Edit</button>      }


    </div>
  )
}

export default Myprofile