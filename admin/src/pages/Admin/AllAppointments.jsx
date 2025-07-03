import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        {/* Header Row */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2.5fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-semibold text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Data Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_2.5fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
          >
            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full bg-gray-200 object-cover' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>

            <p>{item.userData.age}</p>

            <p>{item.slotDate} | {item.slotTime}</p>

            <p>{item.docData?.name || 'N/A'}</p>

            <p>₹{item.amount}</p>

            {
              item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-400 text-xs font-medium'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-6 cursor-pointer'
                  src={assets.cancel_icon}
                  alt='Cancel'
                />
              )
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
