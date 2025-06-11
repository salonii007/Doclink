import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const BottomAdvertise = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-primary flex flex-col md:flex-row px-6 md:px-10 lg:px-12 my-20 rounded-lg items-center justify-between'>
      
      {/* left */}
      <div className='flex-1 py-8'>
        <p className='text-3xl text-white font-bold p-4'>
          Book Appointment <br /> With 100+ Trusted Doctors
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 mx-5 py-2 bg-teal-100 text-teal-900 rounded-full hover:scale-105 transition-all duration-300"
        >
          Create Account
        </button>
      </div>

      {/* right */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img
          className='w-full relative right-0 bottom-0 max-w-md'
          src={assets.appointment_img}
          alt='appointment'
        />
      </div>
    </div>
  );
};

export default BottomAdvertise;
