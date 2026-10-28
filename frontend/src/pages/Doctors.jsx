import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {AppContext} from "../context/AppContext"

const Doctors=()=>{

  const {speciality}=useParams();
  
  const [showFilter,setShowFilter]=useState(false);
  const [searchQuery,setSearchQuery]=useState("");
  const [availableOnly,setAvailableOnly]=useState(false);
  const [maxFee,setMaxFee]=useState("");
  const [sortBy,setSortBy]=useState("recommended");
  const {doctors}=useContext(AppContext);

  const navigate=useNavigate();

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filterDoc = doctors.filter((doctor) => {
    const matchesSpeciality = !speciality || doctor.speciality === speciality;
    const matchesName = !normalizedQuery || doctor.name.toLowerCase().includes(normalizedQuery);
    const matchesAvailability = !availableOnly || doctor.available;
    const matchesFee = !maxFee || Number(doctor.fees) <= Number(maxFee);
    return matchesSpeciality && matchesName && matchesAvailability && matchesFee;
  });
  const visibleDoctors = [...filterDoc].sort((first, second) => {
    if (sortBy === "fee-low") return Number(first.fees) - Number(second.fees);
    if (sortBy === "fee-high") return Number(second.fees) - Number(first.fees);
    if (sortBy === "name") return first.name.localeCompare(second.name);
    return Number(second.available) - Number(first.available);
  });
  const feeValues = doctors.map((doctor) => Number(doctor.fees)).filter(Number.isFinite);
  const feeCeiling = feeValues.length ? Math.max(...feeValues) : 0;

    return(

        <div className="soft-reveal py-7 sm:py-10">
            <div className="mb-8 border-b border-[#dce6e2] pb-6">
              <p className="mb-2 text-xs uppercase tracking-[.16em] text-[#58816f]">Doctor directory</p>
              <h1 className="patient-section-title text-3xl sm:text-4xl text-[#172b35]">ALL DOCTORS</h1>
              <p className="mt-2 text-sm text-gray-600">Browse Through the docters specialist.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-full flex flex-col gap-3 sm:flex-1 sm:max-w-[270px]">
                  <label className="sr-only" htmlFor="doctor-search">Search doctors</label>
                  <input id="doctor-search" type="search" value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search doctors by name" className="patient-search w-full px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14594b]" />
                  <button type="button" aria-expanded={showFilter} aria-controls="doctor-filters" className="patient-pill py-2 px-3 text-sm text-[#14594b] font-medium sm:hidden" onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
                  <aside id="doctor-filters" className={`patient-pill p-4 sm:p-5 ${showFilter?'block':'hidden sm:block'}`}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#64757b]">Speciality</p>
                    <div className="flex flex-col gap-1.5 text-sm text-gray-600">
                      <button type="button" onClick={()=>navigate('/doctors')} className={`text-left px-3 py-2 rounded ${!speciality?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>All doctors</button>
                      <button type="button" onClick={()=>navigate('/doctors/General physician')} className={`text-left px-3 py-2 rounded ${speciality==="General physician"?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>General physician</button>
                      <button type="button" onClick={()=>navigate('/doctors/Gynecologist')} className={`text-left px-3 py-2 rounded ${speciality==="Gynecologist"?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>Gynecologist</button>
                      <button type="button" onClick={()=>navigate('/doctors/Dermatologist')} className={`text-left px-3 py-2 rounded ${speciality==="Dermatologist"?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>Dermatologist</button>
                      <button type="button" onClick={()=>navigate('/doctors/Pediatricians')} className={`text-left px-3 py-2 rounded ${speciality==="Pediatricians"?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>Pediatricians</button>
                      <button type="button" onClick={()=>navigate('/doctors/Neurologist')} className={`text-left px-3 py-2 rounded ${speciality==="Neurologist"?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>Neurologist</button>
                      <button type="button" onClick={()=>navigate('/doctors/Gastroenterologist')} className={`text-left px-3 py-2 rounded ${speciality==="Gastroenterologist"?'bg-[#e8f4ee] text-[#14594b] font-medium':''}`}>Gastroenterologist</button>
                    </div>
                    <label className="flex items-center gap-2 mt-4 py-3 border-t border-[#e5ece8] text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" checked={availableOnly} onChange={(event)=>setAvailableOnly(event.target.checked)} className="accent-[#14594b]" />
                      Available now
                    </label>
                    {feeCeiling > 0 && <div className="pt-3 border-t border-[#e5ece8]">
                      <label className="flex justify-between text-sm text-gray-600" htmlFor="fee-range"><span>Maximum fee</span><span>{maxFee || feeCeiling}</span></label>
                      <input id="fee-range" className="w-full mt-3 accent-[#14594b]" type="range" min={Math.min(...feeValues)} max={feeCeiling} step="5" value={maxFee || feeCeiling} onChange={(event)=>setMaxFee(event.target.value === String(feeCeiling) ? "" : event.target.value)} />
                    </div>}
                  </aside>
                </div>
              <div className="w-full sm:flex-[3] min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <p className="text-sm text-gray-500" aria-live="polite">{filterDoc.length} doctor{filterDoc.length === 1 ? "" : "s"} found</p>
                  <label className="flex items-center gap-2 text-sm text-gray-600">Sort by
                    <select className="patient-search px-3 py-2" value={sortBy} onChange={(event)=>setSortBy(event.target.value)}>
                      <option value="recommended">Recommended</option>
                      <option value="fee-low">Fee: low to high</option>
                      <option value="fee-high">Fee: high to low</option>
                      <option value="name">Name</option>
                    </select>
                  </label>
                </div>
                {filterDoc.length === 0 ? (
                  <div className="border border-[#dce6e2] bg-white rounded-md p-8 text-sm text-gray-600" role="status">
                    No doctors match your search. Try another name or specialty.
                  </div>
                ) : (
              <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
                {visibleDoctors.map((item,index)=>(
                        <article key={item._id || index} className="patient-doctor-card overflow-hidden hover:-translate-y-1 transition-all duration-300">
                          <img className="bg-blue-50" src={item.image} alt={`${item.name}, ${item.speciality}`} />
                          <div className="p-4">
                              <div className={`flex items-center gap-2 text-sm ${item.available ? "text-green-700" : "text-gray-500"}`}>
                                  <span aria-hidden="true" className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"}`}></span><p>{item.available ? "Available" : "Unavailable"}</p>
                              </div>
                              <p className="mt-2 text-gray-900 text-lg font-semibold">{item.name}</p>
                              <p className="text-gray-600 text-sm">{item.speciality}</p>
                              <div className="mt-4 pt-3 border-t border-[#e5ece8] flex justify-between items-center text-sm"><span className="text-gray-500">Consultation</span><span className="font-semibold text-[#14594b]">{item.fees}</span></div>
                                <button type="button" onClick={()=>navigate(`/appointment/${item._id}`)} className="mt-4 w-full flex items-center justify-center gap-2 rounded-md bg-[#14594b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d453b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14594b] transition-colors">View profile <span aria-hidden="true">&rarr;</span></button>
                          </div>
                            </article>
                  ))}
              </div>
                )}
              </div>
            </div>

          
        </div>
    )
}

export default Doctors