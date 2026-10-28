import React, { useContext } from "react"; 
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";


const Sidebar =()=>{

    const {aToken}=useContext(AdminContext);
    

    return(
        <div className="admin-sidebar min-h-screen">
            {
                aToken && 
                
                <ul className="text-[#515151] mt-5 p-3 space-y-1">
                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-4 md:min-w-60 rounded-md cursor-pointer transition-colors ${isActive?'bg-[#eff7f1] text-[#14594b] font-medium':'hover:bg-[#f5f8f6]'}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-4 md:min-w-60 rounded-md cursor-pointer transition-colors ${isActive?'bg-[#eff7f1] text-[#14594b] font-medium':'hover:bg-[#f5f8f6]'}`} to={"/all-appointments"}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-4 md:min-w-60 rounded-md cursor-pointer transition-colors ${isActive?'bg-[#eff7f1] text-[#14594b] font-medium':'hover:bg-[#f5f8f6]'}`} to={"/add-doctor"}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-4 md:min-w-60 rounded-md cursor-pointer transition-colors ${isActive?'bg-[#eff7f1] text-[#14594b] font-medium':'hover:bg-[#f5f8f6]'}`} to={"/doctor-list"}>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar