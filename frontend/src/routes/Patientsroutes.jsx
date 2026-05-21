import React from 'react'
import PatientDashboard from '../Pages/Patient/PatientDashboard';
import ProtectedRoutes from './ProtectedRoutes';

const Patientsroutes = [
    {
        path: '/patientdashboard', element: (
            <ProtectedRoutes allowedRole="patient" >
                <PatientDashboard />
            </ProtectedRoutes>

        )
    },
]
export default Patientsroutes;