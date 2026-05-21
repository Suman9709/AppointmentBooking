import React from "react";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboard";
import LoginPage from "../Components/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
const Doctorroutes = [
    {
        path: '/doctordashboard', element: (
            <ProtectedRoutes allowedRole="doctor" >
                <DoctorDashboard />
            </ProtectedRoutes>
        )
    },
    { path: '/doctorlogin', element: <LoginPage /> }   // "/"
]
export default Doctorroutes;