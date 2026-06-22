import React from "react";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboardLive";
import LoginPage from "../Components/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import DoctorProfile from "../Pages/Doctor/DoctorProfile";
const Doctorroutes = [
    {
        path: '/doctordashboard', element: (
            <ProtectedRoutes allowedRole="doctor" >
                <DoctorDashboard />
            </ProtectedRoutes>
        )
    },
    { path: '/doctorprofile', element: <ProtectedRoutes allowedRole="doctor"><DoctorProfile /></ProtectedRoutes> },
    { path: '/doctorlogin', element: <LoginPage /> }   // "/"
]
export default Doctorroutes;
