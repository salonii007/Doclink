import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const[docImg, setdocImg]= useState(false)
    const[name, setname]=useState("")
    const[email,setemail] = useState('')
    const[password,setpassword]=useState('')
    const[fees, setfees]= useState('')
    const[experience, setexperience]= useState('1 year')
    const[about,setabout]=useState('')
    const[speciality, setspeciality]=useState('General Physician')
    const[degree,setdegree]=useState('')
    const[address1, setaddress1]=useState('')
    const[address2, setaddress2]=useState('')

    const {backendUrl, aToken} =useContext(AdminContext)

    const onSubmitHandler = async (e)=>{
      e.preventDefault()
      try{
        if(!docImg){
            return (
                toast.error("Image Not Selected")
            )
        }
        const formData = new FormData()
        formData.append('image', docImg)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('degree', degree)
        formData.append('fees', Number(fees))
        formData.append('experience', experience)
        formData.append('about', about)
        formData.append('speciality', speciality)
        formData.append('address', JSON.stringify({line1: address1, line2: address2}))


        //API CALL TO BACKEND TO SAVE THE DOCTORS DETAILS

        const {data}= await axios.post(backendUrl+ '/api/admin/add-doctor', formData, {headers:{aToken}} )

         console.log("API Response:", data);

        if(data.success)
        {
          toast.success(data.message)
            //reseting after saving
            setdocImg(false)
            setname("")
            setemail('')
            setpassword('')
            setabout('')
            setaddress1('')
            setaddress2('')
            setdegree('')
            // setexperience('1 year')
            // setspeciality('General Physician')
            setfees('')
        }
        else{
            toast.error(data.message)
        }

        
      } catch(err){

        toast.error(err.message)

      }

    }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

        <p className='mb-3 text-lg font-medium' >Add Doctor</p>
        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-image">
                    <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg)  : assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setdocImg(e.target.files[0])}
                 type="file" id='doc-image' hidden/>
                <p>Upload Doctor <br /> image</p>
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 '>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Doctor name</p>
                        <input onChange={(e)=>setname(e.target.value)} value={name}
                        className='border rounded px-3 py-2'
                         type="text" placeholder='Name' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Doctor email</p>
                        <input 
                        onChange={(e)=>setemail(e.target.value)} value={email}
                        className='border rounded px-3 py-2' 
                        type="email" placeholder='Email' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Doctor Password</p>
                        <input onChange={(e)=>setpassword(e.target.value)} value={password}
                        className='border rounded px-3 py-2'
                         type="password" placeholder='Password' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Experience</p>

                        <select onChange={(e)=>setexperience(e.target.value)} value={experience} 
                        className='border rounded px-3 py-2' >
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 year</option>
                            <option value="3 year">3 year</option>
                            <option value="4 year">4 year</option>
                            <option value="5 year">5 year</option>
                            <option value="6 year">6 year</option>
                            <option value="7 year">7 year</option>
                            <option value="8 year">8 year</option>
                            <option value="9 year">9 year</option>
                            <option value="10 year">10 year</option>
                            <option value="10+ year">10+ year</option>
                            
                        </select>
                        </div>

                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Fees</p>
                        <input onChange={(e)=>setfees(e.target.value)} value={fees} 
                        className='border rounded px-3 py-2'
                         type="number" placeholder='fees' required />
                    </div>
                </div>
                <div>
                    <div className=' w-full lg:flex-1 flex flex-col gap-1 '>
                        <p>Speciality</p>
                        <select onChange={(e)=>setspeciality(e.target.value)} value={speciality}
                         className='border rounded px-3 py-2' name="" id="">
                            <option value="General Physician"> General Physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                            <option value="Neurologist">Neurologist</option>
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Education</p>
                        <input onChange={(e)=>setdegree(e.target.value)} value={degree}
                        className='border rounded px-3 py-2'
                         type="Text" placeholder='Education' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1 '>
                        <p>Address</p>
                        <input onChange={(e)=>setaddress1(e.target.value)} value={address1}
                        className='border rounded px-3 py-2' 
                        type="text" placeholder='address line1'  />
                        <input onChange={(e)=>setaddress2(e.target.value)} value={address2}
                         className='border rounded px-3 py-2'
                        type="text" placeholder='address line2'  />
                    </div>
                </div>
            </div>
          <div className=' mt-4 mb-2 flex-1 flex flex-col gap-1 '>
             <p>About Doctor</p>
            <textarea onChange={(e)=>setabout(e.target.value)} value={about}
            className='w-full border rounded px-4 py-2' type="text" placeholder='Write about doctor' rows={5} required />
            </div>

            <button type='submit' className='bg-primary rounded-xl mt-4 text-white px-6 py-2'>
                Add Doctor</button>
         </div>
    </form>
  )
}

export default AddDoctor