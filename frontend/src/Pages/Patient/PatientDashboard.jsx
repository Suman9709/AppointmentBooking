import React, { useState } from "react";
import ProfileCard from "../../Components/ProfileCard";
import AppointmentCard from "../../Components/AppointmentCard";
import { usePatient } from "../../hooks/usePatient";
import AppointmentBookingForm from "../../Components/AppointmentBookingForm";
import { useMyAppointment } from "../../hooks/useMyAppointment";
import { useCancelAppointment } from "../../hooks/useCancelAppointment";
import Loader from "../../Components/Loader";
import { formatIndianDate, formatIndianTime, isFutureAppointment } from "../../utils/dateTime";
import { useDashboardAnalytics } from "../../hooks/useDashboardAnalytics";
import StatusChart from "../../Components/StatusChart";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {

    const [showBookingForm, setShowBookingForm] = useState(false);
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError
    } = usePatient();

    // backend response
    const patient = data?.user;
    const patientProfile = data?.patientProfile;


    const { data: myAppointment, isLoading: appointmentsLoading, isError: appointmentsError } = useMyAppointment();
    const cancelAppointment = useCancelAppointment();
    const analytics = useDashboardAnalytics("patient");

    // LOADING

    if (isLoading) {

        return (
            <Loader label="Loading your dashboard..." fullPage />
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

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <h1 className="text-3xl font-semibold text-gray-800">
                    Patient Dashboard
                </h1>

                <button
                    onClick={() => setShowBookingForm(true)}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300 font-medium"
                >
                    Book Appointment
                </button>

            </div>

            {/* PROFILE */}

            <ProfileCard

                name={patient?.name}

                email={patient?.email}

                age={patientProfile?.age}

                gender={patientProfile?.gender}

                contact={patientProfile?.contact}

                GuardianName={patientProfile?.parentName}

                address={patientProfile?.address}

                onEdit={() => navigate("/patientprofile")}

            />

            {/* These totals come from the patient analytics API, not UI constants. */}
            {analytics.isLoading ? <Loader label="Loading appointment analytics..." /> : analytics.data && (
                <section className="grid gap-5 lg:grid-cols-3">
                    <article className="rounded-2xl bg-white p-6 shadow"><p className="text-gray-500">All appointments</p><strong className="text-3xl">{analytics.data.total}</strong></article>
                    <article className="rounded-2xl bg-white p-6 shadow"><p className="text-gray-500">Upcoming</p><strong className="text-3xl text-sky-700">{analytics.data.upcoming}</strong></article>
                    <StatusChart data={analytics.data.statusBreakdown} />
                </section>
            )}

            {/* MY APPOINTMENTS */}

            <section  id="myappointments" className="flex flex-col gap-4">

                <h2 className="text-2xl font-semibold text-gray-700">

                    My Appointments

                </h2>

                <div className="flex flex-wrap gap-4">

                    {appointmentsLoading && <div className="w-full"><Loader label="Loading appointments..." /></div>}

                    {appointmentsError && <p className="w-full text-center text-red-600">Could not load appointments.</p>}

                    {!appointmentsLoading && !appointmentsError && myAppointment?.data?.length > 0 ? (

                        myAppointment.data.map((appointment) => (

                            <AppointmentCard

                                key={appointment._id}

                                doctor={
                                    appointment.doctorId?.userId?.name
                                    || "Doctor"
                                }

                                date={
                                    appointment.slotId?.startDateTime
                                        ? formatIndianDate(appointment.slotId.startDateTime)
                                        : "No Slot"
                                }

                                time={
                                    appointment.slotId?.startDateTime
                                        ? `${formatIndianTime(appointment.slotId.startDateTime)} IST`
                                        : "--"
                                }

                                status={appointment.status}

                                canCancel={["pending", "confirmed"].includes(appointment.status) && isFutureAppointment(appointment.slotId?.startDateTime)}

                                cancelling={cancelAppointment.isPending && cancelAppointment.variables === appointment._id}

                                onCancel={() => {
                                    if (window.confirm("Cancel this appointment?")) cancelAppointment.mutate(appointment._id);
                                }}

                            />

                        ))

                    ) : !appointmentsLoading && !appointmentsError ? (

                        <div className="w-full bg-white rounded-2xl p-6 shadow text-center">

                            <p className="text-gray-500">

                                No appointments booked yet

                            </p>

                        </div>
                    ) : null}

                </div>

            </section>


            {/* BOOK APPOINTMENT MODAL */}

            {showBookingForm && (

                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 ">

                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative p-2 overflow-scroll:hidden">
                        {/* CLOSE BUTTON */}

                        <button
                            onClick={() => setShowBookingForm(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
                        >
                            ×
                        </button>

                        <AppointmentBookingForm

                            patient={{
                                name: patient?.name,
                                fatherName: patientProfile?.parentName,
                                contactNumber: patientProfile?.contact,
                                address: patientProfile?.address,
                            }}

                            onBooked={() => setShowBookingForm(false)}
                        />

                    </div>

                </div>

            )}

        </div>
    );
};

export default PatientDashboard;
