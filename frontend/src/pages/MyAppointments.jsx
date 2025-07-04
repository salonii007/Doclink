import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { set } from 'mongoose';

const MyAppointments = () => {

  const {backendUrl, token, getDoctorsData  }= useContext(AppContext);
  const navigate = useNavigate()
  const [appointments, setAppointments]= useState([])

  const months=[ "", "Jan","Feb","Mar","Apr","May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }



  const getuserAppointments= async ()=>{
   try{
    const {data}= await axios.get(backendUrl+ '/api/user/list-appointment', {headers: {token}})
    if(data.success)
    {
    setAppointments(data.appointments.reverse())
    //but ese me we will get the appointments in reversed order! newest wale neechest isliye we added reverse    
    console.log(data.appointments);
    
  }
   }catch(error){
    console.log(error)
    toast.error(error.message)

   }
 }

 const cancelAppointment = async (appointmentId) =>{
  try {
    const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId}, {headers:{token}} )
    if(data.success){
      toast.success(data.mesaage)
      getuserAppointments()
      getDoctorsData()
    }
    else{
      toast.error(data.message)
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
 }

 const initPay=(order)=>{
  const options= {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Appointment Payment',
    description: 'Appointment Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async(response)=>{
      //response tht we would get on successful payment
      console.log(response)

      try {
        const {data}= await axios.post(backendUrl+ '/api/user/verify-razorpay', response, {headers:{token}})
        
        if(data.success)
        {
          getuserAppointments()
          navigate('/myappointments')
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }

    }
  }
  const rzp= new window.Razorpay(options)
  rzp.open();
 }

 const appointmentRazorpay= async(appointmentId)=>{
  try {
    
    const {data}= await axios.post(backendUrl+ '/api/user/payment-razorpay', {appointmentId}, {headers:{token}})

    if(data.success)
    {
      console.log(data.order) 
      initPay(data.order)
    }
  } catch (error) {
    console.log(error.message)
    
  }


 }

 useEffect(()=>{
  if(token){
    getuserAppointments()
  }
 },[token])
  return (
    <div>
      <p className='pb-3 mt-12 text-xl font-semibold'>My Appointments</p>
      <div>
        {appointments.length === 0 && (
  <p className="text-gray-500 mt-6 text-sm">No appointments booked yet.</p>
)}
       {appointments.map((item,index)=>(
        
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold' >{item.docData.name}</p>
            <p>{item.docData.speciality }</p>
            <p className='text-zinc-700 font-medium mt-1' >Address:</p>
            <p className='text-xs' >{item.docData.address.line1}</p>
            <p className='text-xs'>{item.docData.address.line2}</p>
            <p  className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium' >Date and Time:</span>  {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
          </div>
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
          {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-gray-500 bg-indigo-50 '>PAID</button> }
          {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=> appointmentRazorpay(item._id)}
           className=' sm:min-w-48 mb-1 p-2 text-sm bg-green-700 border text-white  border-green-400 hover:bg-green-200 hover:text-black'>
            Pay online </button> }
           {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className=' sm:min-w-48 p-2 border text-sm bg-red-700 text-white border-red-400  hover:bg-red-200 hover:text-black'>
               Cancel Appointment</button> }
               {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500' >Appointment cancelled</button> }
               {item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-green-500 border-green-500 bg-green-50 '>Completed</button> }
            </div>
        </div>
       ))}
      </div>
    </div>
  )
}

export default MyAppointments