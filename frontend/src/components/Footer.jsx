import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
         <div className='flex flexx-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 t-40 text-sm'>
             {/* left */}
             <div>
                <img className='mb-5 w-40' src={assets.logo}/>
                <p className='w-full md:w-2/3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloribus, voluptate vero in doloremque quibusdam. Enim quisquam nostrum ad delectus, odio, ratione corrupti itaque modi aspernatur nisi temporibus debitis officia.</p>
             </div>
             {/* center */}
             <div>
                <p className='text-xl font-medium mb-5' >COMPANY</p>
                <ul className='flex flex-col gap-2 text-teal-900'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>
             {/* right */}
             <div>
                <p className='text-xl font-medium mb-5'> Get in Touch </p>
                <ul className='flex flex-col gap-2 text-teal-900'>
                    <li>+91 7389786130</li>
                    <li>saloni007mahajan@gmail.com</li>
                </ul>
             </div>

             
         </div>
         <div>
                {/* copyright wala text */}
                <hr/>
                <p className='text-center text-xs text-gray-600'>Reserved Rights</p>
             </div>

    </div>
  )
}

export default Footer