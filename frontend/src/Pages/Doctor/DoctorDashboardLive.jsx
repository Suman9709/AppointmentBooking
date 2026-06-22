import React,{ useState } from "react";
import { CalendarDays, CheckCircle, Clock3, Plus, Users } from "lucide-react";
import Loader from "../../Components/Loader";
import SlotForm from "../../Components/SlotForm";
import StatusChart from "../../Components/StatusChart";
import { useCreateSlot } from "../../hooks/useCreateSlot";
import { useDashboardAnalytics } from "../../hooks/useDashboardAnalytics";
import { useDoctor } from "../../hooks/useDoctor";
import { formatIndianTime } from "../../utils/dateTime";
import { Link } from "react-router-dom";

const DoctorDashboardLive = () => {
  const [slotModal, setSlotModal] = useState(false);
  const analytics = useDashboardAnalytics("doctor");
  const profile = useDoctor();
  const createSlot = useCreateSlot();

  if (analytics.isLoading || profile.isLoading) return <Loader label="Loading doctor analytics..." fullPage />;
  if (analytics.isError || profile.isError) return <p className="p-10 text-center text-red-600">Could not load doctor dashboard.</p>;

  const data = analytics.data;
  const completed = data.statusBreakdown.find((item) => item.name === "completed")?.value || 0;
  const uniquePatients = new Set(data.todaysAppointments.map((item) => item.patientId?._id).filter(Boolean)).size;
  const stats = [
    ["Today's appointments", data.totals.today, <CalendarDays />],
    ["Available slots", data.totals.availableSlots, <Clock3 />],
    ["Today's patients", uniquePatients, <Users />],
    ["Completed visits", completed, <CheckCircle />],
  ];

  return <main className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 p-4 md:p-8">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">Doctor Dashboard</h1><p className="text-gray-500">Welcome, {profile.data?.data?.loggedinUser?.name}</p></div><div className="flex gap-3"><Link to="/doctorprofile" className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold">My profile</Link><button onClick={() => setSlotModal(true)} className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white"><Plus /> Create slot</button></div></header>
    <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, icon]) => <article key={label} className="flex items-center justify-between rounded-2xl bg-white p-6 shadow"><div><p className="text-gray-500">{label}</p><strong className="text-3xl">{value}</strong></div><span className="rounded-xl bg-sky-100 p-4 text-sky-700">{icon}</span></article>)}</section>
    <section className="grid gap-8 xl:grid-cols-3"><StatusChart data={data.statusBreakdown} /><div className="overflow-x-auto rounded-3xl bg-white p-6 shadow xl:col-span-2"><h2 className="mb-5 text-xl font-bold">Today's appointments</h2><table className="w-full text-left"><thead><tr className="border-b text-gray-500"><th className="pb-3">Patient</th><th>Time (IST)</th><th>Status</th></tr></thead><tbody>{data.todaysAppointments.map((item) => <tr key={item._id} className="border-b border-gray-100"><td className="py-4">{item.patientId?.name || "Unknown"}</td><td>{item.slotId ? formatIndianTime(item.slotId.startDateTime) : "—"}</td><td className="capitalize">{item.status}</td></tr>)}</tbody></table>{!data.todaysAppointments.length && <p className="py-8 text-center text-gray-500">No appointments today.</p>}</div></section>
    {slotModal && <SlotForm isPending={createSlot.isPending} onClose={() => setSlotModal(false)} onSubmit={(values) => createSlot.mutate(values, { onSuccess: () => setSlotModal(false) })} />}
  </main>;
};

export default DoctorDashboardLive;
