import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showmenu, setshowmenu] = useState(false);
  const [token, settoken] = useState(true); //when we have token we are loggedin and when not, we are logged out

  return (
    <div className="flex items-center justify-between text-sm border-b border-b-gray-500 mb-5">
      <img onClick={()=> {navigate('/home')}} className="w-50 cursor-pointer" src={assets.logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li className="py-1">
          <NavLink to="/">Home</NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className="py-1">
          <NavLink to="/doctors">All Doctors</NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className="py-1">
          <NavLink to="/about">About</NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className="py-1">
          <NavLink to="/contact">Contact</NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
      </ul>
      <div>
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="userprofile"
            />
            <img className="w-2.5"
            //   onClick={() => {}}
              src={assets.dropdown_icon}
              alt="dropdownicon"
            />
            <div className=" absolute top-0 right-0 pt-14 text-base font-medium text-teal-900 z-20 hidden group-hover:block" >
                <div className="min-w-28 bg-cyan-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={()=>{navigate('/myprofile')}} className="hover:text-black cursor-pointer">My profile</p>
                    <p onClick={()=>{navigate('/myappointments')}}className="hover:text-black cursor-pointer">Appointments</p>
                    <p onClick={()=>{
                        settoken(false);
                    }} className="hover:text-black cursor-pointer">logout</p>
                </div>
                </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
