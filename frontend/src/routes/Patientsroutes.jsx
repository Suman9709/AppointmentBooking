import React from 'react'
import PatientDashboard from '../Pages/Patient/PatientDashboard';
import ProtectedRoutes from './ProtectedRoutes';
import PatientProfile from '../Pages/Patient/PatientProfile';

const Patientsroutes = [
    {
        path: '/patientdashboard', element: (
            <ProtectedRoutes allowedRole="patient" >
                <PatientDashboard />
            </ProtectedRoutes>

        )
    },
    { path: '/patientprofile', element: <ProtectedRoutes allowedRole="patient"><PatientProfile /></ProtectedRoutes> },
]
export default Patientsroutes;
