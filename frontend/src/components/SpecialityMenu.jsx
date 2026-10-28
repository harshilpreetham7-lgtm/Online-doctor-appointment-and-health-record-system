import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu=()=>{
    return(
        <div className="flex flex-col items-center gap-4 py-16 text-gray-800 mt-4 soft-reveal" id="speciality">
            <p className="text-xs uppercase tracking-[.16em] text-[#58816f]">Care, made easier</p>
            <h1 className="patient-section-title text-3xl sm:text-4xl">Find by Speciality</h1>
            <p className="sm:w-1/3 text-center text-sm leading-6 text-[#64757b]">Simply browse through our extensive list of trusted Doctors. <br />So,Schedule Your appointment Now.</p>
            <div className="flex sm:justify-center gap-3 pt-5 w-full overflow-x-auto pb-2">
                {specialityData.map((item,index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className="group flex flex-col items-center justify-center text-xs cursor-pointer flex-shrink-0 w-28 sm:w-36 min-h-32 px-3 py-4 border border-[#dce6e2] bg-white/80 rounded-md hover:border-[#9dc6b3] hover:bg-[#eff7f1] hover:-translate-y-1 transition-all duration-300" key={index} to={`/doctors/${item.speciality}`}>
                        <img className="w-14 sm:w-16 mb-3 transition-transform group-hover:scale-105" src={item.image} alt="" />
                        <p className="text-center font-medium text-[#29443d]">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu