import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext'
import { useEffect } from 'react'
  

const Login = () => { 

    const [state, setState] =useState('Admin')

    const {setatoken, backendUrl} =useContext(AdminContext)
    const { setdToken}= useContext(DoctorContext)

    const [email, setemail]=useState('')
    const [password, setpassword] = useState('')

     useEffect(() => {
    if (state === 'Admin') {
      setemail('admin@doclink.com')
      setpassword('doclink@123')
    } else {
      setemail('testdoctor@gmail.com')
      setpassword('123456789')
    }
  }, [state])



    const onSubmitHandle = async (event)=>{
        event.preventDefault()

        try {

          if(state=== 'Admin'){

            const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
            if(data.success){
                // console.log(data.token)
                localStorage.setItem('aToken', data.token)
                setatoken(data.token)
            }
            else{
                toast.error(data.message)
            }
          }  else{

            const {data}= await axios.post(backendUrl+'/api/doctor/login', {email,password})
            if(data.success)
            {
              localStorage.setItem('dToken', data.token)
              setdToken(data.token)
              console.log(data.token);
              
            }
            else{
              toast.error(data.message)
            }

          }
            
        } catch (err) {

            toast.error(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandle} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
            <p className='text-2xl font-semibold m-auto'> <span className='text-primary'> {state} </span> Login </p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-black rounded w-full p-2 mt-1'
                 onChange={(e)=>{setemail(e.target.value)}}
                value={email}
                type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input  className='border border-black rounded w-full p-2 mt-1'
                type="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)} />
            </div>
            <button
            className='bg-primary text-white w-full py-2 mt-2 rounded-md text-base'>Login</button>
           {
            state==='Admin'
            ? <p>Doctor Login ? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}> Click here </span> </p>
            : <p>Admin Login ? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}> Click here </span> </p>
           }
        </div>
    </form>
  )
}

export default Login