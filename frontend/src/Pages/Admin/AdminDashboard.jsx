import React, { useState } from "react";
import { FaUserMd, FaUsers, FaCalendarCheck, FaHospital, } from "react-icons/fa";
import { MdDashboard, } from "react-icons/md";
import { useAllDoctor } from "../../hooks/useAllDoctor";
import { useAllDepartments } from "../../hooks/useAllDepartments";
// import { getAllAppointments } from "../../hooks/useAllAppointment";
import { getAllAppointmentsForAdminData } from "../../hooks/useAllAppointmentforAdmin";
import CreateDoctor from "../../Components/CreateDoctor";
import { useCreateDoctor } from "../../hooks/useCreateDoctor";
import CreateDepartment from "../../Components/CreateDepartment";
import { useCreateDepartment } from "../../hooks/useCreateDepartment";

const AdminDashboard = () => {

  const [openCreateDoctorModal, setOpenCreateDoctorModal] = useState(false);
  const [openCreateDepartmentModal, setOpenCreateDepartmentModal] = useState(false);



  const { data: doctorsData } = useAllDoctor();
  const { data: allDepartments } = useAllDepartments();
  const { data: todaysAppointments } = getAllAppointmentsForAdminData();

  const { mutate: createDoctors, isPending } = useCreateDoctor();
  const { mutate: createDepartment } = useCreateDepartment();

  const totalDoctors = doctorsData?.data?.length || 0;
  const totalDepartments = allDepartments ? allDepartments?.departments?.length : 0;
  const totalAppointments =
    todaysAppointments?.totalSlotsToday ?? 0;


  const handleCreateDoctor = (data) => {
    createDoctors(data, {
      onSuccess: () => {
        setOpenCreateDoctorModal(false);
      },
    });
  }

  const handleCreateDepartment = (data) => {
    createDepartment(data, {
      onSuccess: () => {
        setOpenCreateDepartmentModal(false);
      },
    });
  }
  const stats = [
    {
      title: "Total Doctors",
      value: totalDoctors,
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
      value: totalAppointments,
      icon: <FaCalendarCheck />,
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      title: "Departments",
      value: totalDepartments,
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

        <div className="flex gap-2 sm:gap-3 flex-wrap">

          <button
            onClick={() =>
              setOpenCreateDepartmentModal(true)
            }
            className="group flex items-center gap-1.5 sm:gap-2 bg-white border border-sky-200 text-sky-700 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
          >
            <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-100 group-hover:rotate-90 transition-transform duration-300 text-sm sm:text-base">
              +
            </span>

            <span>Create Department</span>
          </button>

          <button
            onClick={() =>
              setOpenCreateDoctorModal(true)
            }
            className="group flex items-center gap-1.5 sm:gap-2 bg-linear-to-r from-blue-500 to-blue-500 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
          >
            <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 group-hover:rotate-90 transition-transform duration-300 text-sm sm:text-base">
              +
            </span>

            <span>Create Doctor</span>
          </button>
        </div>
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

      {/* dialog box */}

      <CreateDoctor
        isOpen={openCreateDoctorModal}
        onClose={() => setOpenCreateDoctorModal(false)}
        departments={allDepartments?.departments || []}
        onSubmit={handleCreateDoctor}

      />

      <CreateDepartment
        isOpen={openCreateDepartmentModal}
        onClose={() => setOpenCreateDepartmentModal(false)}
        onSubmit={handleCreateDepartment}
      />

    </div>
  );
};

export default AdminDashboard;