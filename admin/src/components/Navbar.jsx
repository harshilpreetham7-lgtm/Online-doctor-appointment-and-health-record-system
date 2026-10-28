import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import {assets} from '../assets/assets';
import {useNavigate} from 'react-router-dom'

const Navbar=()=>{
    const {aToken,setAToken}=useContext(AdminContext);

    const navigate=useNavigate();

    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

    return(
        <div className="admin-topbar flex justify-between items-center px-4 sm:px-8 py-3">
            <div className="flex items-center gap-3 text-xs">
                <img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="" />
                <p className="border px-2.5 py-1 rounded-full border-[#c7ddd2] bg-[#eff7f1] text-[#14594b] font-medium">{aToken ?'Admin':'Doctor'}</p>
            </div>
            <button onClick={logout} className="bg-[#14594b] hover:bg-[#0d453b] text-white text-sm px-6 py-2.5 rounded-md transition-colors">Logout</button>
        </div>
    )
}

export default Navbar