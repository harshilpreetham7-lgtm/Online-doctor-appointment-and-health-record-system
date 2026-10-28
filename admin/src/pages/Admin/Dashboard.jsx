import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Dashboard=()=>{
    const {aToken,getDashData,cancelAppointment,dashData}=useContext(AdminContext)

    const {slotDateFormat}=useContext(AppContext)

    useEffect(()=>{
        if(aToken){
            getDashData()
        }
    },[aToken])

    return dashData && (
        <div className="admin-enter max-w-7xl mx-auto"> 
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div><p className="text-xs uppercase tracking-[.16em] text-[#58816f]">Prescripto operations</p><h1 className="mt-2 text-3xl font-semibold text-[#172b35]">Dashboard</h1><p className="mt-1 text-sm text-[#65777b]">Live overview from your current records</p></div>
                <p className="text-xs text-[#65777b]">Updated when this page loads</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="admin-stat flex items-center gap-4 p-5 cursor-default">
                    <img className="w-14" src={assets.doctor_icon} alt="" />
                    <div>
                        <p className="text-3xl font-semibold text-[#172b35]">{dashData.doctors}</p>
                        <p className="text-sm text-[#65777b]">Doctors</p>
                    </div>
                </div>

                <div className="admin-stat flex items-center gap-4 p-5 cursor-default">
                    <img className="w-14" src={assets.appointments_icon} alt="" />
                    <div>
                        <p className="text-3xl font-semibold text-[#172b35]">{dashData.appointments}</p>
                        <p className="text-sm text-[#65777b]">Appointments</p>
                    </div>
                </div>

                <div className="admin-stat flex items-center gap-4 p-5 cursor-default">
                    <img className="w-14" src={assets.patients_icon} alt="" />
                    <div>
                        <p className="text-3xl font-semibold text-[#172b35]">{dashData.patients}</p>
                        <p className="text-sm text-[#65777b]">Patients</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
            <section className="admin-panel overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b">
                    <img className="w-9" src={assets.list_icon} alt="" />
                    <p className="font-semibold text-[#172b35]">Latest Appointment Bookings</p>
                </div>
                <div>
                    {dashData.latestAppointments.length ? dashData.latestAppointments.map((item,index)=>(
                            <div className="flex items-center px-5 py-4 gap-3 border-b last:border-b-0 hover:bg-[#f7faf8] transition-colors" key={index}>
                                <img className="rounded-full w-10" src={item.docData.image} alt="" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">{item.docData.name}</p>
                                    <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                                </div>
                                {
                                                                        item.cancelled ?
                                                                        <p className="text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-xs font-medium">Cancelled</p>:
                                                                        <button type="button" onClick={()=>cancelAppointment(item._id)} className="text-xs px-3 py-2 border border-red-200 rounded-md text-red-700 hover:bg-red-50">Cancel</button>
                                }
                            </div>
                                                )) : <p className="p-6 text-sm text-[#65777b]">No appointment bookings yet.</p>}
                </div>
                        </section>
                        <aside className="admin-panel p-5">
                            <p className="text-sm font-semibold text-[#172b35]">Quick actions</p>
                            <div className="mt-4 flex flex-col gap-2">
                                <NavLink className="px-4 py-3 rounded-md bg-[#14594b] text-white text-sm font-medium hover:bg-[#0d453b]" to="/all-appointments">Appointments</NavLink>
                                <NavLink className="px-4 py-3 rounded-md border border-[#dce6e2] text-[#14594b] text-sm font-medium hover:bg-[#eff7f1]" to="/add-doctor">Add Doctor</NavLink>
                                <NavLink className="px-4 py-3 rounded-md border border-[#dce6e2] text-[#14594b] text-sm font-medium hover:bg-[#eff7f1]" to="/doctor-list">Doctors List</NavLink>
                            </div>
                        </aside>
                        </div>
        </div>
    )
}

export default Dashboard