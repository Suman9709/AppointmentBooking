import React from "react";
import AdminDashboard from "../Pages/Admin/AdminDashboardLive";
import LoginPage from "../Components/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminProfile from "../Pages/Admin/AdminProfile";

const Adminroutes = [
    {
        path: '/admindashboard', element: (
            <ProtectedRoutes allowedRole="admin" >
                <AdminDashboard />
            </ProtectedRoutes>)
    },
    { path: '/adminprofile', element: <ProtectedRoutes allowedRole="admin"><AdminProfile /></ProtectedRoutes> },
    { path: '/adminlogin', element: <LoginPage /> },
    // {path:'/managedoctors', element:<CreateDoctor />}

]

export default Adminroutes;
