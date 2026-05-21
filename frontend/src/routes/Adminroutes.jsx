import React from "react";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import LoginPage from "../Components/LoginPage";
import CreateDoctor from "../Components/CreateDoctor";
import ProtectedRoutes from "./ProtectedRoutes";

const Adminroutes = [
    {
        path: '/admindashboard', element: (
            <ProtectedRoutes allowedRole="admin" >
                <AdminDashboard />
            </ProtectedRoutes>)
    },
    { path: '/adminlogin', element: <LoginPage /> },
    // {path:'/managedoctors', element:<CreateDoctor />}

]

export default Adminroutes;