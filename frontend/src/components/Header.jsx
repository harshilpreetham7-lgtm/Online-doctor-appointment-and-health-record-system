import React from "react";
import { assets } from "../assets/assets";

const Header=()=>{
    return(
        <div className="patient-hero flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-16">
            {/* ----Left Side------ */}

            <div className="patient-hero-copy md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 md:py-20 m-auto md:mr-auto md:ml-0 relative z-10">
                <p className="text-xs uppercase tracking-[.18em] text-emerald-100">Prescripto care network</p>
                <p className="text-4xl md:text-5xl text-white font-semibold leading-tight">
                    Book Appointment <br />With Trusted Doctors
                </p>
                <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light leading-6">
                    <img className="w-28 " src={assets.group_profiles} alt="" />
                    <p>Here,You can browse the list of trusted Doctors.<br className="hidden md:block"/>So you can feel free to schedule your Appointment</p>
                </div>
                <a href="#speciality" className="flex items-center gap-3 bg-white px-7 py-3.5 rounded-md text-[#14594b] text-sm font-semibold m-auto md:m-0 hover:bg-emerald-50 transition-all duration-300">Book Appointment
                    <img className="w-3" src={assets.arrow_icon} alt="" /></a>
            </div>

            {/* ----Right Side------ */}

            <div className="md:w-[54%] relative min-h-[260px] md:min-h-full">
                <img className="absolute inset-0 w-full h-full" src={assets.header_img} alt="Doctor speaking with a patient" />
            </div>

        </div>
    )
}

export default Header