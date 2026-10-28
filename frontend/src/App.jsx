import React, { useContext } from "react";
import Home from "./pages/Home";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import About from "./pages/About";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from '../../admin/src/context/AdminContext.jsx'
import AdminLogin from '../../admin/src/pages/Login.jsx'
import AdminNavbar from '../../admin/src/components/Navbar.jsx'
import AdminSidebar from '../../admin/src/components/Sidebar.jsx'
import AdminDashboard from '../../admin/src/pages/Admin/Dashboard.jsx'
import AdminAllAppointments from '../../admin/src/pages/Admin/AllAppointments.jsx'
import AdminAddDoctor from '../../admin/src/pages/Admin/AddDoctor.jsx'
import AdminDoctorsList from '../../admin/src/pages/Admin/DoctorsList.jsx'

const AdminArea = () => {
  const { aToken } = useContext(AdminContext)

  if (!aToken) {
    return <AdminLogin />
  }

  return (
    <div className="admin-workspace">
      <ToastContainer />
      <AdminNavbar />
      <div className="admin-workspace flex items-stretch">
        <div className="admin-sidebar border-r"><AdminSidebar /></div>
        <main className="admin-main p-4 sm:p-7">
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/all-appointments" element={<AdminAllAppointments />} />
            <Route path="/add-doctor" element={<AdminAddDoctor />} />
            <Route path="/doctor-list" element={<AdminDoctorsList />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

const PublicArea = () => (
  <div className="patient-shell">
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/doctors' element={<Doctors/>} />
      <Route path='/doctors/:speciality' element={<Doctors/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/my-profile' element={<MyProfile/>} />
      <Route path='/my-appointments' element={<MyAppointments/>} />
      <Route path='/appointment/:docId' element={<Appointment/>} />
    </Routes>
    <Footer/>
  </div>
)

const App=()=>{
  return (
    <Routes>
      <Route path='/admin' element={<AdminArea />} />
      <Route path='/admin-dashboard' element={<AdminArea />} />
      <Route path='/all-appointments' element={<AdminArea />} />
      <Route path='/add-doctor' element={<AdminArea />} />
      <Route path='/doctor-list' element={<AdminArea />} />
      <Route path='*' element={<PublicArea />} />
    </Routes>
  )
}

export default App