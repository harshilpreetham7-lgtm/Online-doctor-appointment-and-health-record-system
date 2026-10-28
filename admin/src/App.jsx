import React, { useContext } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import Sidebar from "./components/Sidebar.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="admin-workspace">
      <ToastContainer />
      <Navbar/>
      <div className="admin-workspace flex items-stretch">
        <div className="admin-sidebar border-r"><Sidebar/></div>
        <main className="admin-main p-4 sm:p-7">
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointments" element={<AllAppointments/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorsList/>}/>
        </Routes>
        </main>
      </div>
    </div>
    ) : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}
export default App