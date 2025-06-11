import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

      {/* LEFT */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 mx-auto'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
          Book Appointment <br /> with Trusted Doctors ~ <br /> No Queues! No Worries
        </p>
        <p className='text-white text-sm font-light'>
          Easily explore our list of trusted doctors <br className='hidden sm:block' /> and book your appointment in seconds.
        </p>
        <div className='rounded-lg bg-white p-4 hover:scale-105 transition-all duration-300'>
          <a className='flex items-center gap-2 text-teal-800' href='#speciality'>
            Book Appointment <img className='w-3' src={assets.arrow_icon} alt='arrow' />
          </a>
        </div>
      </div>

      {/* RIGHT */}
     <div className='md:w-1/2 flex items-center justify-center p-4'>
  <img className='w-full max-w-md h-auto rounded-lg' src={assets.header_img} alt='header' />
</div>

    </div>
  );
};

export default Banner;
