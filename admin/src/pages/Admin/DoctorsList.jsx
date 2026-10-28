import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList=()=>{

    const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [availableOnly, setAvailableOnly] = useState(false);
    const visibleDoctors = doctors.filter((doctor) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery = !query || doctor.name.toLowerCase().includes(query) || doctor.speciality.toLowerCase().includes(query);
        return matchesQuery && (!availableOnly || doctor.available);
    });

    useEffect(()=>{
        if(aToken){
            getAllDoctors();
        }
    },[aToken])
    
    return(
        <div className="admin-enter max-h-[90vh] overflow-y-auto">
            <p className="text-xs uppercase tracking-[.16em] text-[#58816f]">Care network</p>
            <h1 className="text-2xl font-semibold mt-2 text-[#172b35]">All Doctors</h1>
            <div className="flex flex-wrap items-center gap-3 mt-5">
                <label className="sr-only" htmlFor="admin-doctor-search">Search doctors</label>
                <input id="admin-doctor-search" type="search" value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search name or speciality" className="w-full sm:w-72 px-3 py-2.5 bg-white border border-[#dce6e2] rounded-md text-sm" />
                <label className="flex items-center gap-2 text-sm text-[#65777b]"><input type="checkbox" checked={availableOnly} onChange={(event)=>setAvailableOnly(event.target.checked)} className="accent-[#14594b]" />Available only</label>
                <span className="text-sm text-[#65777b]" aria-live="polite">{visibleDoctors.length} of {doctors.length} doctors</span>
            </div>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6 ">
                {visibleDoctors.length ? visibleDoctors.map((item,index)=>(
                        <div className="admin-panel max-w-56 overflow-hidden group" key={index}>
                            <img className="bg-[#e8f4ee] group-hover:opacity-90 transition-all duration-300 aspect-square object-cover" src={item.image} alt={item.name} />
                            <div className="p-4">
                                <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                                <div className="mt-2 flex items-center gap-1 text-sm">
                                    <input aria-label={`Set ${item.name} availability`} onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} className="accent-[#14594b]" />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    )) : <p className="admin-panel w-full p-6 text-sm text-[#65777b]">No doctors match these filters.</p>}
            </div>
        </div>
    )
}

export default DoctorsList