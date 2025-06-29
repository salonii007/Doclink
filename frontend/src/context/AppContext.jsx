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

    const [userData, setUserData]= useState(false)

    console.log("Using backendUrl:", backendUrl);

   
    const getDoctorsData=async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setdoctors(data.doctors)
                
            }
            else{
                console.log("yaha atak raha he")
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }  
    
    }

    const loadUserProfile = async ()=>{
        try {
            const {data}= await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}})
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


         const value={
        doctors, getDoctorsData,
        settoken, token, backendUrl,
         userData, setUserData, loadUserProfile
    }


        useEffect(()=>{
            getDoctorsData()
        },[])

        useEffect(()=>{
            if(token){
            loadUserProfile()
            }
            else{
                setUserData(false) //jab logout karo tab
            }
        },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider