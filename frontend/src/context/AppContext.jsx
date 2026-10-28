import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import { doctorPhotoByFilename } from "../assets/assets"

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currencySymbol='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://prescripto-backend-as3g.onrender.com"
    const backendBase = backendUrl ? String(backendUrl).replace(/\/$/, '') : '';
    const [doctors,setDoctors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData,setUserData]=useState(false);

    const getDoctorsData = async () => {
        try {
            const apiUrl = backendUrl
                ? `${backendUrl.replace(/\/$/, '')}/api/doctor/list`
                : '/api/doctor/list'

            const { data } = await axios.get(apiUrl)
            if (data.success) {
                const doctorsWithImages = data.doctors.map((doctor) => {
                    const bundledImageMatch = doctor.image?.match(/\/src\/assets\/(doc\d+\.png)$/)
                    const bundledImage = bundledImageMatch ? doctorPhotoByFilename[bundledImageMatch[1]] : null

                    return {
                        ...doctor,
                        image: bundledImage || doctor.image,
                    }
                })
                setDoctors(doctorsWithImages)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData=async()=>{
        try {
            const {data}=await axios.get(backendBase+'/api/user/get-profile',{headers:{token}});
            if(data.success){
                setUserData(data.userData);
            }else{
                if (data.message?.toLowerCase().includes('session') || data.message?.toLowerCase().includes('signature')) {
                    localStorage.removeItem('token')
                    setToken(false)
                    setUserData(false)
                }
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                localStorage.removeItem('token')
                setToken(false)
                setUserData(false)
            }
            toast.error(error.message)
        }
    }

    const value={
        doctors,getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,backendBase,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
