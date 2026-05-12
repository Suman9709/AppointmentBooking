import React from "react";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaHospital,
} from "react-icons/fa";
import {
  MdDashboard,
  MdNotifications,
} from "react-icons/md";

const AdminDashboard = () => {

  const stats = [
    {
      title: "Total Doctors",
      value: 24,
      icon: <FaUserMd />,
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Total Patients",
      value: 148,
      icon: <FaUsers />,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Appointments",
      value: 312,
      icon: <FaCalendarCheck />,
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      title: "Departments",
      value: 12,
      icon: <FaHospital />,
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
  ];

  const recentAppointments = [
    {
      patient: "Rishav Kumar",
      doctor: "Dr. Sarah Smith",
      date: "12 May 2026",
      status: "Confirmed",
    },
    {
      patient: "Aman Verma",
      doctor: "Dr. John Watson",
      date: "13 May 2026",
      status: "Pending",
    },
    {
      patient: "Priya Sharma",
      doctor: "Dr. Michael Brown",
      date: "14 May 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
            <MdDashboard className="text-sky-600" />
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage doctors, patients and appointments
          </p>
        </div>

        <button className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl hover:shadow-lg transition">
          <MdNotifications className="text-xl text-sky-600" />
          Notifications
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {item.value}
              </h2>
            </div>

            <div
              className={`${item.bg} ${item.text} p-4 rounded-2xl text-3xl`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* RECENT APPOINTMENTS */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold text-gray-800">
              Recent Appointments
            </h2>

            <button className="text-sky-600 font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-gray-500">
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Doctor</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentAppointments.map((appointment, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium text-gray-700">
                      {appointment.patient}
                    </td>

                    <td className="py-4 text-gray-600">
                      {appointment.doctor}
                    </td>

                    <td className="py-4 text-gray-600">
                      {appointment.date}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-4">

            <button className="bg-sky-600 hover:bg-sky-700 transition text-white rounded-xl p-4 font-medium">
              + Add New Doctor
            </button>

            <button className="bg-green-600 hover:bg-green-700 transition text-white rounded-xl p-4 font-medium">
              View Patients
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 transition text-white rounded-xl p-4 font-medium">
              Manage Appointments
            </button>

            <button className="bg-orange-600 hover:bg-orange-700 transition text-white rounded-xl p-4 font-medium">
              Add Department
            </button>
          </div>

          {/* ADMIN PROFILE */}
          <div className="mt-8 bg-sky-50 rounded-2xl p-5">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center text-2xl font-bold">
                A
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Admin
                </h3>

                <p className="text-sm text-gray-500">
                  Hospital Management System
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;