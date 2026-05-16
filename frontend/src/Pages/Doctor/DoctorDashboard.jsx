import React, { useState } from "react";

import {
  CalendarDays,
  Clock3,
  Users,
  Stethoscope,
  Activity,
  CircleCheckBig,
  CircleX,
  Bell,
  Plus,
} from "lucide-react";
import SlotForm from "../../Components/SlotForm";
import { getAllAppointments } from "../../hooks/useAllAppointment";
import { useDoctor } from "../../hooks/useDoctor";

const DoctorDashboard = () => {
  const [showSlotForm, setShowSlotForm] = useState(false);

  const{data:appointments} = getAllAppointments();
  const{data:doctorData} = useDoctor();

const totalDoctorAppointments =
  appointments?.slots?.length || 0;

  const stats = [
    {
      title: "Today's Appointments",
      value: 10,
      icon: <CalendarDays className="w-7 h-7 text-sky-600" />,
      bg: "bg-sky-100",
    },
    {
      title: "Available Slots",
      value: totalDoctorAppointments,
      icon: <Clock3 className="w-7 h-7 text-emerald-600" />,
      bg: "bg-emerald-100",
    },
    {
      title: "Total Patients",
      value: 248,
      icon: <Users className="w-7 h-7 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Completed Visits",
      value: 120,
      icon: <CircleCheckBig className="w-7 h-7 text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  const todaysappointments = [
    {
      patient: "Rahul Sharma",
      time: "10:00 AM",
      status: "Completed",
    },
    {
      patient: "Priya Verma",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      patient: "Aman Singh",
      time: "01:00 PM",
      status: "Cancelled",
    },
    {
      patient: "Sneha Gupta",
      time: "03:30 PM",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 p-4 md:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Doctor Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back 👨‍⚕️ Manage your appointments and patients.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setShowSlotForm(true)}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-xl shadow-md transition">
            <Plus className="w-5 h-5" />

            Create Slot
          </button>
        </div>
      </div>

      {/* ================= TOP CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MAIN SECTION ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ================= APPOINTMENTS ================= */}

        <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Today's Appointments
            </h2>

            <button className="text-sky-600 font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left border-b border-gray-200">

                  <th className="pb-4 text-gray-500 font-semibold">
                    Patient
                  </th>

                  <th className="pb-4 text-gray-500 font-semibold">
                    Time
                  </th>

                  <th className="pb-4 text-gray-500 font-semibold">
                    Status
                  </th>

                  <th className="pb-4 text-gray-500 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {todaysappointments.map((appointment, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-sky-50 transition"
                  >
                    <td className="py-5 font-medium text-gray-700">
                      {appointment.patient}
                    </td>

                    <td className="py-5 text-gray-600">
                      {appointment.time}
                    </td>

                    <td className="py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${appointment.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="py-5">
                      <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="space-y-8">

          {/* PROFILE CARD */}

          <div className="bg-white rounded-3xl shadow-md p-6">

            <div className="flex flex-col items-center text-center">

              <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center">
                <Stethoscope className="w-12 h-12 text-sky-600" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {doctorData?.data?.loggedinUser?.name || "Dr. John Doe"}
              </h2>

              <p className="text-gray-500">
                {doctorData?.data?.doctorProfile?.departmentId?.name || "Cardiologist"}
              </p>

              <div className="mt-6 w-full space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Experience</span>
                  <span className="font-semibold">
                    {doctorData?.data?.doctorProfile?.experience || 10} yrs
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>qualifications</span>
                  <span className="font-semibold">
                    {doctorData?.data?.doctorProfile?.qualifications || 248}
                  </span>
                </div>
                 <div className="flex justify-between text-gray-600">
                  <span>Specialization</span>
                  <span className="font-semibold">
                    {doctorData?.data?.doctorProfile?.specialization}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Status</span>

                  <span className="text-emerald-600 font-semibold">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showSlotForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-100">
            <SlotForm
              onClose={() => setShowSlotForm(false)}
              onSubmit={(data) => {
                console.log("New Slot Data", data);
                setShowSlotForm(false); // auto close after submit
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;