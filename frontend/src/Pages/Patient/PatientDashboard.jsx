import React from "react";
import ProfileCard from "../../Components/ProfileCard";
import AppointmentCard from "../../Components/AppointmentCard";
import { usePatient } from "../../hooks/usePatient";

const PatientDashboard = () => {

    const {
        data,
        isLoading,
        isError
    } = usePatient();

    // backend response
    const patient = data?.user;
    const patientProfile = data?.patientProfile;

    // LOADING

    if (isLoading) {

        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-2xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    // ERROR

    if (isError) {

        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-2xl text-red-500 font-semibold">
                    Failed to load dashboard
                </h1>
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-8">

            {/* TITLE */}

            <h1 className="text-3xl font-semibold text-gray-800">

                Patient Dashboard

            </h1>


            {/* PROFILE */}

            <ProfileCard

                name={patient?.name}

                email={patient?.email}

                age={patientProfile?.age}

                gender={patientProfile?.gender}

                contact={patientProfile?.contact}

                GuardianName={patientProfile?.parentName}

                address={patientProfile?.address}

            />


            {/* UPCOMING */}

            <div className="flex flex-col gap-4">

                <h2 className="text-2xl font-semibold text-gray-700">

                    Upcoming Appointments

                </h2>

                <div className="flex flex-wrap gap-4">

                    <AppointmentCard
                        doctor="Dr. Sarah Smith"
                        date="10 June 2026"
                        time="10:30 AM"
                        status="Upcoming"
                    />

                    <AppointmentCard
                        doctor="Dr. Michael Brown"
                        date="15 June 2026"
                        time="12:00 PM"
                        status="Upcoming"
                    />

                </div>
            </div>


            {/* PAST */}

            <div className="flex flex-col gap-4">

                <h2 className="text-2xl font-semibold text-gray-700">

                    Past Appointments

                </h2>

                <div className="flex flex-wrap gap-4">

                    <AppointmentCard
                        doctor="Dr. John Watson"
                        date="01 May 2026"
                        time="11:00 AM"
                        status="Completed"
                    />

                </div>
            </div>

        </div>
    );
};

export default PatientDashboard;