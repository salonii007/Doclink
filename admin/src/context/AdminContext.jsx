
import { useState } from "react";
import axios from 'axios'
import { createContext } from "react";
import { toast } from 'react-toastify'

export const AdminContext= createContext()

const AdminContextProvider =(props)=>{

    const [aToken, setatoken]= useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): "")

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setdoctors]=useState([])

    const getAllDoctors = async ()=>{
        try{
            const {data}= await axios.post(backendUrl+'/api/admin/all-doctors', {}, {headers: {aToken}})
            if(data.success){
                console.log("one");
                
                console.log(data.doctors);
                
                setdoctors(data.doctors)

            }
            else{
                console.log("two");
                
                toast.error(data.message)
            }
        }catch(Err){
            toast.error(Err.message);
        }
    }

    const changeAvailablity = async (docId) =>{
        try {
            
            const { data }= await axios.post(backendUrl + '/api/admin/change-availablity', {docId}, {headers:{aToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAllDoctors()
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value= {
        aToken, setatoken,
        backendUrl, getAllDoctors,
        doctors, setdoctors , changeAvailablity
    }

    return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
    )

}

export default AdminContextProvider