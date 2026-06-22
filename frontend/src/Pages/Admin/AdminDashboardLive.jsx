import React,{ useState } from "react";
import { FaCalendarCheck, FaHospital, FaUserMd, FaUsers } from "react-icons/fa";
import CreateDoctor from "../../Components/CreateDoctor";
import CreateDepartment from "../../Components/CreateDepartment";
import Loader from "../../Components/Loader";
import StatusChart from "../../Components/StatusChart";
import { useAllDepartments } from "../../hooks/useAllDepartments";
import { useCreateDepartment } from "../../hooks/useCreateDepartment";
import { useCreateDoctor } from "../../hooks/useCreateDoctor";
import { useDashboardAnalytics } from "../../hooks/useDashboardAnalytics";
import { formatIndianDate, formatIndianTime } from "../../utils/dateTime";
import { Link } from "react-router-dom";

const AdminDashboardLive = () => {
  const [doctorModal, setDoctorModal] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const { data, isLoading, isError } = useDashboardAnalytics("admin");
  const { data: departments } = useAllDepartments();
  const createDoctor = useCreateDoctor();
  const createDepartment = useCreateDepartment();

  if (isLoading) return <Loader label="Loading admin analytics..." fullPage />;
  if (isError) return <p className="p-10 text-center text-red-600">Could not load admin dashboard.</p>;

  const stats = [
    ["Doctors", data.totals.doctors, <FaUserMd />, "bg-blue-100 text-blue-700"],
    ["Patients", data.totals.patients, <FaUsers />, "bg-green-100 text-green-700"],
    ["Appointments", data.totals.appointments, <FaCalendarCheck />, "bg-purple-100 text-purple-700"],
    ["Departments", data.totals.departments, <FaHospital />, "bg-orange-100 text-orange-700"],
  ];

  return <main className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 p-4 md:p-8">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1><p className="text-gray-500">Live hospital overview</p></div>
      <div className="flex flex-wrap gap-3"><Link to="/adminprofile" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700">My profile</Link><button onClick={() => setDepartmentModal(true)} className="rounded-xl border border-sky-300 bg-white px-4 py-3 text-sky-700">+ Department</button><button onClick={() => setDoctorModal(true)} className="rounded-xl bg-sky-600 px-4 py-3 text-white">+ Doctor</button></div>
    </header>
    <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, icon, color]) => <article key={label} className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-md"><div><p className="text-gray-500">{label}</p><strong className="text-3xl text-gray-800">{value}</strong></div><span className={`rounded-xl p-4 text-2xl ${color}`}>{icon}</span></article>)}</section>
    <section className="grid gap-8 xl:grid-cols-3">
      <StatusChart data={data.statusBreakdown} />
      <div className="overflow-x-auto rounded-3xl bg-white p-6 shadow-md xl:col-span-2"><h2 className="mb-5 text-xl font-bold">Recent appointments</h2>
        <table className="w-full text-left"><thead><tr className="border-b text-gray-500"><th className="pb-3">Patient</th><th>Doctor</th><th>Date (IST)</th><th>Status</th></tr></thead><tbody>{data.recentAppointments.map((item) => <tr key={item._id} className="border-b border-gray-100"><td className="py-4">{item.patientId?.name || "Unknown"}</td><td>{item.doctorId?.userId?.name || "Unknown"}</td><td>{item.slotId ? `${formatIndianDate(item.slotId.startDateTime)}, ${formatIndianTime(item.slotId.startDateTime)}` : "—"}</td><td className="capitalize">{item.status}</td></tr>)}</tbody></table>
        {!data.recentAppointments.length && <p className="py-8 text-center text-gray-500">No appointments yet.</p>}
      </div>
    </section>
    <CreateDoctor isOpen={doctorModal} onClose={() => setDoctorModal(false)} departments={departments?.departments || []} onSubmit={(values) => createDoctor.mutate(values, { onSuccess: () => setDoctorModal(false) })} />
    <CreateDepartment isOpen={departmentModal} onClose={() => setDepartmentModal(false)} onSubmit={(values) => createDepartment.mutate(values, { onSuccess: () => setDepartmentModal(false) })} />
  </main>;
};

export default AdminDashboardLive;
