import React, { useContext, useState } from "react";
import axios from 'axios'
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets.js";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
        if (data.success) {
          localStorage.setItem('aToken',data.token)
          setAToken(data.token);
        }else{
          setPassword('')
          toast.error(data.message === 'Invalid Credentials'
            ? 'Invalid Credentials. Check ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env.'
            : data.message)
        }
      }
      catch (error) {
        toast.error(error.response?.data?.message || `Unable to reach the backend: ${error.message}`)
        
    }
    } 
  

  return (
    <form onSubmit={onSubmitHandler} className="admin-login-shell admin-enter">
      <section className="admin-login-aside">
        <img className="w-40 brightness-0 invert" src={assets.admin_logo} alt="Prescripto" />
        <div><p className="text-xs uppercase tracking-[.18em] text-emerald-100">Care operations</p><h1 className="mt-4 max-w-xl text-4xl sm:text-5xl font-semibold leading-tight">A clearer view of care, every day.</h1><p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/85">Coordinate doctors and appointments from one focused workspace.</p></div>
        <p className="text-xs text-emerald-100/75">Prescripto operations workspace</p>
      </section>
      <div className="admin-login-card flex flex-col gap-4 items-start text-[#5E5E5E] text-sm">
        <p className="text-2xl font-semibold"><span className="text-[#14594b]">Admin</span> Login </p>
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" />
        </div>
        <button className="bg-[#14594b] hover:bg-[#0d453b] text-white w-full py-3 rounded-md text-base transition-colors">Login</button>
        
      </div>
    </form>
  )
}

export default Login