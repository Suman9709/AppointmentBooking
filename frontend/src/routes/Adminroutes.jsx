import React from "react";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import LoginPage from "../Components/LoginPage";
import CreateDoctor from "../Components/CreateDoctor";


const Adminroutes = [
    { path: '/admindashboard', element: <AdminDashboard /> },
    {path:'/adminlogin', element:<LoginPage />},
    // {path:'/managedoctors', element:<CreateDoctor />}
       
]

export default Adminroutes;