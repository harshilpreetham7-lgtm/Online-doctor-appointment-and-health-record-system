import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from 'react-toastify';
import axios from 'axios';


const Appointment = () => {

    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, setToken, getDoctorsData } = useContext(AppContext);
    const navigate = useNavigate()
    const backendBase = backendUrl ? String(backendUrl).replace(/\/$/, '') : '';

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [booking, setBooking] = useState(false);


    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId);
        setDocInfo(docInfo);

    }

    const getAvailableSlots = async () => {
        setDocSlots([])
        if (!docInfo) return;

        //getting date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            //getting date with index

            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            //setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime
                const bookedForDate = docInfo.slots_booked?.[slotDate] || []
                const isSlotAvailable = !bookedForDate.includes(slotTime)

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                //Increment time by 30 Minutes

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (booking) return
        if (!token) {
            toast.warn("Login to book an Appointment");
            return navigate('/login')
        }
        if (!slotTime || !docSlots[slotIndex]?.some((slot) => slot.time === slotTime)) {
            toast.warn('Please select an available appointment time.')
            return
        }
        setBooking(true)
        try {
            const date = docSlots[slotIndex][0].datetime
            const day = date.getDate()
            const month = date.getMonth()+1
            const year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year

            const { data } = await axios.post(backendBase + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });

            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token')
                setToken(false)
                toast.warn('Your session expired. Please log in again.')
                navigate('/login')
                return
            }
            toast.error(error.message);
        } finally {
            setBooking(false)
        }
    }

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo])

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots])

    return docInfo && (
        <div className="soft-reveal py-7 sm:py-10">
            <div className="mb-8 border-b border-[#dce6e2] pb-6">
                <p className="mb-2 text-xs uppercase tracking-[.16em] text-[#58816f]">Appointment booking</p>
                <h1 className="patient-section-title text-3xl sm:text-4xl">Your visit, thoughtfully planned</h1>
            </div>
            {/* Docters Details */}
            <div className='flex flex-col sm:flex-row gap-5'>
                <div>
                    <img className='bg-[#e8f4ee] w-full sm:w-72 aspect-square object-cover rounded-md' src={docInfo.image} alt={`${docInfo.name}, ${docInfo.speciality}`} />
                </div>
                <div className='flex-1 border border-[#dce6e2] rounded-md p-6 sm:p-8 bg-white/90'>
                    {/* Doc Info:Name,Degree,experience... */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {docInfo.name}
                        <img className='w-4' src={assets.verified_icon} alt="" aria-hidden="true" />
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='py-1 px-2.5 border border-[#dce6e2] text-xs rounded-full'>{docInfo.experience}</span>
                    </div>
                    {/* About section */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About
                            <img src={assets.info_icon} alt="" aria-hidden="true" />
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>{docInfo.about}</p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-[#e5ece8] flex flex-wrap items-end justify-between gap-4">
                      <div><p className="text-xs uppercase tracking-wide text-gray-500">Appointment fee</p><p className='text-2xl font-semibold text-[#14594b] mt-1'>{currencySymbol}{docInfo.fees}</p></div>
                      <div className="flex items-center gap-2 text-sm text-green-700"><span aria-hidden="true" className={`w-2 h-2 rounded-full ${docInfo.available ? "bg-green-500" : "bg-gray-400"}`}></span>{docInfo.available ? "Available for appointments" : "Currently unavailable"}</div>
                    </div>
                </div>
            </div>
            {/* Booking Slots */}
            <div className='mt-8 font-medium text-gray-700 border border-[#dce6e2] bg-white/80 rounded-md p-5 sm:p-7'>
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div><p className="text-xs uppercase tracking-[.15em] text-[#58816f]">Choose a time</p><b className="patient-section-title text-2xl block mt-1">Booking Slots</b></div>
                  <p className="text-sm text-gray-500">Next 7 days</p>
                </div>
                <div className='flex gap-3 items-center w-full overflow-x-auto mt-5 pb-2'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <button type="button" aria-pressed={slotIndex === index} onClick={() => {setSlotIndex(index);setSlotTime('')}} className={`text-center py-3 px-4 min-w-[72px] rounded-md cursor-pointer transition-colors ${slotIndex === index ? 'bg-[#14594b] text-white' : 'border border-[#dce6e2] bg-white hover:bg-[#eff7f1]'}`} key={index}>
                                <span className="block text-[11px] tracking-wide opacity-75">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                                <span className="block text-lg mt-1">{item[0] && item[0].datetime.getDate()}</span>
                            </button>
                        ))
                    }
                </div>
                <p className="mt-4 text-xs uppercase tracking-wide text-gray-500">Available times</p>
                <div className='flex flex-wrap items-center gap-2.5 mt-3'>
                    {
                        docSlots[slotIndex]?.map((item, index) => (
                            <button type="button" aria-pressed={item.time === slotTime} onClick={() => setSlotTime(item.time)} key={index} className={`text-sm flex-shrink-0 px-4 py-2 rounded-md cursor-pointer transition-colors ${item.time === slotTime ? 'bg-[#14594b] text-white' : 'text-gray-600 border border-[#dce6e2] bg-white hover:border-[#14594b]'}`}>
                                {item.time.toLowerCase()}
                            </button>
                        ))
                    }
                </div>
                                {!slotTime && <p className="mt-4 text-sm text-gray-500" role="status">Select a date and time to continue.</p>}
                                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#e5ece8] pt-5">
                                    <p className="text-sm text-gray-600">{slotTime ? <>Selected: <span className="font-semibold text-[#172b35]">{docSlots[slotIndex]?.[0]?.datetime.toLocaleDateString()} at {slotTime}</span></> : 'Choose a slot above to book this appointment.'}</p>
                                    <button type="button" onClick={bookAppointment} disabled={booking || !slotTime || !docInfo.available} aria-busy={booking} className='bg-[#14594b] hover:bg-[#0d453b] text-white text-sm font-semibold px-8 py-3 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed'>{booking ? 'Booking...' : 'Book an Appointment'}</button>
                                </div>
            </div>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointment