import { createContext } from "react";
export const AppContext = createContext()
import  axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'

const AppContextProvider = (props)=>{

    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const [doctors, setdoctors]= useState([]) 
    const [token,settoken]=useState (localStorage.getItem('token')? localStorage.getItem('token'): false )

    console.log("👉 BACKEND URL =", backendUrl);





   
    const getDoctorsData=async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setdoctors(data.doctors)
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }   }


         const value={
        doctors, settoken, 
        token, backendUrl
    }


        useEffect(()=>{
            getDoctorsData()
        },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider