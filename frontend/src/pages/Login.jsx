import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'



const Login = () => {

  const {token, settoken, backendUrl } = useContext(AppContext)

  const navigate = useNavigate();
  const [state, setstate]=useState("Sign Up");

  const[email,setemail]=useState("");

  const [password,setpassword]=useState("");
  const [name, setname]=useState("");


  const onsubmithandler= async (event)=>{
    event.preventDefault() //iss see! when u submit the form the page will NOT reload 
    try {
      if(state== 'Sign Up')
      {
        const response= await axios.post(backendUrl+ "/api/user/register", {name, password, email})
        const data= response.data
        if(data.success)
        {
          localStorage.setItem('token', data.token)
          settoken(data.token)
        }else
        {
          toast.error(data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + "/api/user/login", {email,password})
        const data= response.data
        if(data.success){
                          localStorage.setItem('token', data.token)
          settoken(data.token)
        }else
        {
          toast.error(data.message)
        }
      }
      
    } catch (error) {
       toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  }, [token])

  return (
    <div>
      <form onSubmit={onsubmithandler} className='min-h-[80vh] flex items-center' action="" >
        <div className=' px-8 py-7 border border-gray-200 min-w-[340px] sm:min-w-96 m-auto shadow-lg rounded-lg bg-gray-50'>
          <p className='text-bold text-gray-800 text-3xl mb-8'>
            {state==='Sign Up'? "Create Account" : "Login"}
          </p>
          <p className='text-sm text-gray-500 '>
            Please {state==='Sign Up'? "sign up" : "Log in"} to book appointment
          </p>
          
          <div className='mt-6'>
            {
              state === "Sign Up" && <div> 
            <p>Fullname</p>
            <input className=' rounded p-2 w-full mt-1 border border gray-700' type="text" onChange={(e)=>
              setname(e.target.value)
            }
            required
            value={name}/>
            </div>
            
          }
            <p>Email</p>
            <input className=' rounded p-2 w-full mt-1 border border gray-700' type="email" onChange={(e)=>
              setemail(e.target.value)
            }
            value={email} 
            required/>
            <p>Password</p>
            <input  className=' rounded p-2  w-full mt-1 border border gray-700' type="password" onChange={(e)=>
              setpassword(e.target.value)
            }
            required
            value={password}/>
          </div>
          <button type='submit' className='  rounded bg-primary text-white w-full p-2 mt-4 center'
          >{state==='Sign Up'? "Create Account" : "Login"}</button>
       {
        state==="Sign Up"
        ?<p className='text-sm text-gray-700 mt-3'>Already have an account? <span onClick={()=>setstate("Login")} className='text-primary underline cursor-pointer'>Login here</span></p>
        : <p className='text-sm text-gray-700 mt-3' >Create a new account? <span onClick={()=>setstate("Sign Up")} className='text-primary underline cursor-pointer' >Click here</span></p>
       }
        </div>


      </form>

    </div>
  )
}

export default Login