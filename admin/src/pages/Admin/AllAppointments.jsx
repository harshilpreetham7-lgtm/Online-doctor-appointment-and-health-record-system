import React, { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments=()=>{
    const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext);
    const {calculateAge,slotDateFormat,currencySymbol}=useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const query = searchQuery.trim().toLowerCase();
    const visibleAppointments = appointments.filter((appointment) => {
        const matchesQuery = !query || appointment.userData?.name?.toLowerCase().includes(query) || appointment.docData?.name?.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "all"
            || (statusFilter === "cancelled" && appointment.cancelled)
            || (statusFilter === "paid" && !appointment.cancelled && appointment.payment)
            || (statusFilter === "unpaid" && !appointment.cancelled && !appointment.payment);
        return matchesQuery && matchesStatus;
    });

    useEffect(()=>{
        if(aToken){
            getAllAppointments()
        }
    },[aToken])
    return(
        <div className="admin-enter w-full max-w-6xl">
            <p className="text-xs uppercase tracking-[.16em] text-[#58816f]">Scheduling</p>
            <p className="mb-4 mt-2 text-2xl font-semibold text-[#172b35]">All Appointments</p>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <label className="sr-only" htmlFor="appointment-search">Search appointments</label>
                <input id="appointment-search" type="search" value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search patient or doctor" className="w-full sm:w-72 px-3 py-2.5 bg-white border border-[#dce6e2] rounded-md text-sm" />
                <label className="sr-only" htmlFor="appointment-status">Filter appointments by status</label>
                <select id="appointment-status" value={statusFilter} onChange={(event)=>setStatusFilter(event.target.value)} className="px-3 py-2.5 bg-white border border-[#dce6e2] rounded-md text-sm">
                    <option value="all">All statuses</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <span className="text-sm text-[#65777b]" aria-live="polite">{visibleAppointments.length} appointments</span>
            </div>
            <div className="admin-panel text-sm min-h-[60vh] max-h-[80vh] overflow-auto">
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
                <p>#</p>
                <p>Patient</p>
                <p>Age</p>
                <p>Date&Time</p>
                <p>Doctor</p>
                <p>Fees</p>
                <p>Actions</p>
            </div>
                {visibleAppointments.length ? visibleAppointments.map((item,index)=>(
                    <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 " key={index}>
                        <p className="max-sm:hidden">{index+1}</p>
                        <div className="flex items-center gap-2 ">
                            <img className="w-8 rounded-full" src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                        </div>
                        <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                        <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                         <div className="flex items-center gap-2">
                            <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
                        </div>
                        <p className="font-medium text-[#172b35]">{currencySymbol}{item.amount}</p>
                        {
                            item.cancelled ?
                            <p className="text-red-400 text-xs font-medium">Cancelled</p>:
                            <img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                        }
                    </div>
                )) : <p className="p-6 text-sm text-[#65777b]">No appointments match these filters.</p>}
            </div>
        </div>
    )
}

export default AllAppointments