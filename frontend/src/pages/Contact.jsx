import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div>
        <p className='text-gray-600 text-center'>CONTACT <span className='text-gray-900 text-semibold'>US</span></p>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm' >

          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600' >OUR OFFICE</p>
          <p className='text-gray-500'>452001 Nanda Nagar <br/> Indore, Madhya Pradesh</p>
          <p className='text-gray-500'> Tel: (0733) 2232276 <br/> Email: saloni007mahajan@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'> Careers as Doclink</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border text-gray-600 p-3 border-gray-300 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Contact