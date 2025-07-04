import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showmenu, setshowmenu] = useState(false);
  const {token, settoken, userData} = useContext(AppContext) //when we have token we are loggedin and when not, we are logged out


  const logout=()=>{
    settoken(false)
    localStorage.removeItem('token')
  }
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
        <li className="px-4 py-2 bg-teal-50 text-primary rounded-full border border-primary hover:bg-white transition duration-200">
  <a href="https://doclink-admin-doctor.vercel.app" target="_blank" rel="noopener noreferrer">Doctor/Admin</a>
  <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
</li>

      </ul>
      <div>
        {token  && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
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
                    <p onClick={()=>{navigate('/myappointment')}}className="hover:text-black cursor-pointer">Appointments</p>
                    <p onClick={()=>{
                       logout();
                       navigate('/login');
                    }} className="hover:text-black cursor-pointer">logout</p>
                </div>
                </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Create Account/Login
          </button>
        )}
        </div>
        <img onClick={()=>setshowmenu(true)} className="w-6 ml-2 md:hidden" src={assets.menu_icon} alt="" />
      {/* mobile menu */}
      <div className={` ${showmenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="" />
          <img className="w-5" onClick={()=>setshowmenu(false)}
           src={assets.cross_icon} alt="" />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
  className="px-4 py-2 hover:bg-primary hover:text-white rounded inline-block"
  href="https://doclink-admin-doctor.vercel.app"
  target="_blank"
  rel="noopener noreferrer"
>
  Doctor/Admin
</a>
          <NavLink className='px-4 py-2 rounded inline-block' 
          onClick={()=>setshowmenu(false)} to={'/'}>HOME</NavLink>
          <NavLink className='px-4 py-2 rounded inline-block'
          onClick={()=>setshowmenu(false)} to={'/doctors'}>ALL DOCTORS</NavLink>
          <NavLink className='px-4 py-2 rounded inline-block'
          onClick={()=>setshowmenu(false)} to={"/about"}>ABOUT</NavLink>
          <NavLink className='px-4 hover:bg-primary hover:text-white py-2 rounded inline-block'
          onClick={()=>setshowmenu(false)} to={"/contact"}>CONTACT</NavLink>
        </ul>
      </div>
      
    </div>
  );
};

export default Navbar;
