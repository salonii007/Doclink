import axios from "axios"; 

import { useState } from "react";
import { createContext } from "react";
import {toast} from  'react-toastify';

export const DoctorContext= createContext()

const DoctorContextProvider =(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL 
    const [dToken, setdToken]= useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'): "");
    const [appointments, setAppointments]= useState([])
    const [dashData, setDashData] = useState(false)
    const[profileData, setprofileData]= useState(false)

    const getAppointments = async ()=>{
        try {
            const {data}= await axios.get(backendUrl+ '/api/doctor/appointments', {headers:{dToken}})
            if(data.success){
                setAppointments(data.appointments.reverse())
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const completeAppointment= async(appointmentId)=>{
        try{
            const {data} = await axios.post (backendUrl+'/api/doctor/complete-appointment', {}, {appointmentId}, {headers:{dToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        }catch(err){
            console.log(err);
            toast.error(err.message)
            
 
        }
    }

    const cancelAppointment= async(appointmentId)=>{
        try{
            const {data} = await axios.post (backendUrl+'/api/doctor/cancel-appointment', {appointmentId}, {headers:{dToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        }catch(err){
            console.log(err);
            toast.error(err.message)
            
 
        }
    }

    const getDashData = async () => {
  try {
    

    const { data } = await axios.get(
      backendUrl + '/api/doctor/dashboard',
      
      { headers: { dToken } }
    );

    if (data.success) {
      setDashData(data.dashData);
    }
  } catch (err) {
    console.log(err.message);
  }
}
    const getprofileData= async()=>{
        try {
            const {data}= await axios.get(backendUrl+ '/api/doctor/profile', {headers:{dToken}})
            if(data.success){
                setprofileData(data.profileData)

            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
             console.log(error.message);
            toast.error(error.message)
        }
    }
    const value= {
        dToken, setdToken, backendUrl, getAppointments,
        appointments, setAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData,getDashData,
        profileData, setprofileData, getprofileData,
    }

    return (
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
    )

}



export default DoctorContextProvider