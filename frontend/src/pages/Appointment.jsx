import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const {docId}= useParams()
  const navigate = useNavigate()
  
  const {doctors, backendUrl ,token, getDoctorsData}= useContext(AppContext  )
  const daysofWeek =['SUN','MON', 'TUE', 'WED','THU', 'FRI', 'SAT'];

  const [docInfo, setdocInfo] = useState(null);


  // for booking slot!
  const [docSlots, setdocSlots]= useState([]);  //2D array of slots for 7 days
  const [slotIndex, setslotIndex]= useState(0); // selected day index (0 to 6)
  const [slotTime, setslotTime]= useState('');  // selected time 

  const fetchDocInfo= async()=>{  //url me jo docid he usse doctor info match
    const docInfo= doctors.find(doc=> String(doc._id)===String(docId));
    setdocInfo(docInfo) 
  }

  

  const getAvailSlot = async ()=>
  {
    // logic to calculate available slots for the doctor

    setdocSlots([]) //clear previous slot

    // getting current date
    let today= new Date()  

    for(let i=0; i<7; i++)
    {
     //getting date with index
     let currentDate= new Date(today)  
     currentDate.setDate(today.getDate()+i)  //move to future days-7

     //setting end time of date
     let endTime= new Date()
     endTime.setDate(today.getDate()+i)
     endTime.setHours(21,0,0,0)  //till 9:00 pm tak ke rahenge
     //setting hours

     if (today.getDate() === currentDate.getDate()) {
  const hour = currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10;
  const minute = currentDate.getMinutes() > 30 ? 30 : 0;
  currentDate.setHours(hour);
  currentDate.setMinutes(minute);
    }else{ //ni toh morning 10 se start kr do
      currentDate.setHours(10)
      currentDate.setMinutes(0);
    }

    let timeSlots=[]  //isme time slots stored he

    while(currentDate<endTime) //jab tak 9 ni baje! 30-30 minutes ke slot jodte jao
    {
      let formattedTime= currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
   

     let day=currentDate.getDate()
     let month = currentDate.getMonth()+1
     let year = currentDate.getFullYear( )

     const slotDate= day+"_"+month +"_"+year
     const slotTime = formattedTime

     const isslotavailable = docInfo.slots_booked[slotDate]  && docInfo.slots_booked[slotDate].includes(slotTime)? false:true


     if(isslotavailable){
      //add slots to array
     timeSlots.push({
      datetime: new Date(currentDate),
      time: formattedTime
     })
    }

     //incrementing time by 30 minutes

     currentDate.setMinutes(currentDate.getMinutes()+30)
    }

    setdocSlots(prev=> ([...prev, timeSlots]))

    }
  }

  const bookAppointment = async ()=>{
    if(!token){
      toast.warn('Please Login to book appointment')
      return navigate ('/login')
    }
    try {
      const date= docSlots[slotIndex][0].datetime

      let day= date.getDate();
      let month = date.getMonth()+1
      let year= date.getFullYear()

      const slotDate= day + "_" + month + "_" + year

      console.log(slotDate);
      
      const {data}= await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers: {token}})
      if(data.success)
      {
        toast.success(data.message)
        getDoctorsData // so tht its updated 
        navigate('/my-appointments')
      }
      else
      {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
      
    }
  }

  useEffect (()=>{
    fetchDocInfo();
  },[doctors, docId])

  useEffect (()=>{
    getAvailSlot()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])


  return docInfo && ( //return only when docInfo available
    <div>
      {/* doc deatils */}
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src= {docInfo.image} alt="image"/>
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-88px] sm:mt-0'>
          <p className='text-2xl flex items-center gap-2 text-teal-900'> 
            {docInfo.name} 
            <img className='w-5' src= {assets.verified_icon }/>
          </p>
          <div className='flex items-center gap-2' >
          <p> {docInfo.degree} - {docInfo.speciality} </p>
          <button className='border-black text-xs rounded-full bg-gray-200 py-0.5 px-4'> {docInfo.experience} </button>
          </div>
           <div  >
          <p className='flex items-center gap-1 text-sm text-gray-900 mt-3'> About <img src= {assets.info_icon } /> </p>
          <p className='text-sm text-gray-600 max-w-[700px] mt-1' > {docInfo.about} </p>
        </div>
        <p> Appointment Fee- {docInfo.fees} Rs.</p>
        </div>
        
        
      </div>


      {/* BOOKINGGG SLOTSS */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-800'>

        <p>Booking Slot</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length >0 && docSlots.map((item, index)=>(
              <div onClick={()=>{
                setslotIndex(index)
              }}
               className={`text-center py-6 min-w-16 rounded-full 
              cursor-pointer ${slotIndex=== index ? 'bg-primary text-white' : 'border border-gray-400' }`} key={index}>
                <p> {item[0] && daysofWeek[item[0].datetime.getDay()]} </p>
                <p> {item[0] && item[0].datetime.getDate()} </p>
              </div>
            ))

          }
        

      </div>

      {/* timeeeee slots */}
       <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots[slotIndex].map((item, index)=>(

            <p 
            onClick={()=>{
              setslotTime(item.time)
            }}
            className={` rounded-full border border-teal-600 text-sm font-light flex-shrink-0 px-5 py-2 rounded--full cursor-pointer
            ${item.time===slotTime ? 'bg-primary text-white' : 'text-gray-600 border border-gray-500' } `} key={index}>

              {
                item.time.toLowerCase()
              }
            </p>
          ))
        }


       </div>

       {/* Book the appointment for slected date n time */}
       <div>
        <button 
        onClick={bookAppointment}
        className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-4' >
          Book Appointment
        </button>
       </div>
       </div>

       <RelatedDoctors docId={docId} speciality={docInfo.speciality}  />
   
    </div>
  ) 
}

export default Appointment