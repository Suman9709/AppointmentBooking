import React from "react";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import LoginPage from "../Components/LoginPage";


const Adminroutes = [
    { path: '/admindashboard', element: <AdminDashboard /> },
    {path:'/adminlogin', element:<LoginPage />}   // "/"
]

export default Adminroutes;