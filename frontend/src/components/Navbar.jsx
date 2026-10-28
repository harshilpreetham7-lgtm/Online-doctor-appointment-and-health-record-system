import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Navbar=()=>{

    const navigate=useNavigate();

    const [showMenu,setShowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext);

    const logout=()=>{
        setToken(false)
        localStorage.removeItem('token')
    }

   return(
        <div className='patient-nav -mx-[max(14px,calc((100vw-1240px)/2))] px-[max(14px,calc((100vw-1240px)/2))]'>
        <div className='patient-nav-inner flex items-center justify-between text-sm'>
        <img onClick={()=>navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt="Prescripto" /> 
            <ul className="hidden md:flex items-center gap-8 font-medium text-[13px] tracking-wide">
                <NavLink to='/'>
                    <li className="py-1">HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className="py-1">ALL DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to={'/about'}>
                    <li className="py-1">ABOUT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className="py-1">CONTACT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
            </ul>
                <div className="flex items-center gap-4 ">
                    {
                    token && userData
                    ?<div className="flex items-center gap-2 cursor-pointer group relative">
                        <img className="w-8 rounded-full" src={userData.image} alt="" />
                        <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                        <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block group-focus-within:block">
                            <div className="min-w-44 bg-white border border-emerald-100 shadow-xl rounded-md flex flex-col gap-4 p-4">
                                <p onClick={()=>navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                                <p onClick={()=>navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                            </div>
                        </div>
                    </div>
                    :<button onClick={()=>navigate('/login')} className="bg-[#14594b] text-white px-6 py-3 rounded-md font-medium hidden md:block hover:bg-[#0d453b] transition duration-300 ease-in-out">Create Account</button>
                    }

                    <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />

                    {/* Menu bar for Mobile */}

                    <div className={` ${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                        <div className="flex items-center justify-between px-5 py-6">
                            <img className="w-36" src={assets.logo} alt="" />
                            <img className="w-7" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                        </div>
                        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font- to=''">
                            <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
                            <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
                            <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
                            <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
                        </ul>
                    </div>
                </div>
        </div>
            </div>
   )
}
export default Navbar