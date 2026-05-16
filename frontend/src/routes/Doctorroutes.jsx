import React from "react";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboard";
import LoginPage from "../Components/LoginPage";

const Doctorroutes = [
    { path: '/doctordashboard', element: <DoctorDashboard /> }, 
    {path:'/doctorlogin', element:<LoginPage />}   // "/"
]
export default Doctorroutes;