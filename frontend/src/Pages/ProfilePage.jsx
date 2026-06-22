import React,{ useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BadgeCheck, Building2, Mail, Save, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { useAuth } from "../context/authContext";
import { getRoleProfile, updateRoleProfile } from "../services/profileApi";

const roleFields = {
  admin: [],
  doctor: [
    ["specialization", "Specialization", "text"], ["experience", "Experience (years)", "number"],
    ["qualifications", "Qualifications", "text"], ["isAvailable", "Available for booking", "checkbox"],
  ],
  patient: [
    ["age", "Age", "number"], ["gender", "Gender", "select"], ["contact", "Contact number", "text"],
    ["parentName", "Guardian name", "text"], ["address", "Address", "textarea"],
  ],
};

const ProfilePage = ({ profileRole }) => {
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();
  const profile = useQuery({ queryKey: ["roleProfile", profileRole], queryFn: () => getRoleProfile(profileRole) });
  const [draft, setDraft] = useState({});
  const mutation = useMutation({
    mutationFn: updateRoleProfile,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["roleProfile", profileRole] }), refreshAuth()]);
    },
  });

  if (profile.isLoading) return <Loader label="Loading your profile..." fullPage />;
  if (profile.isError) return <p className="page-shell text-center text-red-600">Unable to load profile.</p>;

  const dashboard = `/${profileRole}dashboard`;
  const values = { name: profile.data.user?.name || "", email: profile.data.user?.email || "", ...profile.data.details, ...draft };
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  return <main className="page-shell">
    <Link to={dashboard} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-700"><ArrowLeft size={18} /> Back to dashboard</Link>
    <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="relative bg-linear-to-br from-slate-950 via-teal-950 to-teal-700 p-8 text-white md:p-12">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative flex flex-wrap items-center gap-6"><div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 ring-1 ring-white/30"><UserRound size={38} /></div><div><p className="eyebrow text-cyan-200">{profileRole} account</p><h1 className="text-3xl font-bold md:text-4xl">{values.name || "Your profile"}</h1><p className="mt-2 flex items-center gap-2 text-white/70"><ShieldCheck size={17} /> Secure account settings</p></div></div>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); mutation.mutate({ role: profileRole, values }); }} className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
        <ProfileInput icon={<BadgeCheck />} label="Full name" value={values.name} onChange={(value) => update("name", value)} />
        <ProfileInput icon={<Mail />} label="Email address" type="email" value={values.email} onChange={(value) => update("email", value)} />
        {roleFields[profileRole].map(([key, label, type]) => <ProfileInput key={key} icon={<Building2 />} label={label} type={type} value={values[key]} onChange={(value) => update(key, value)} />)}
        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
          <p className={`text-sm ${mutation.isError ? "text-red-600" : "text-emerald-600"}`}>{mutation.isError ? mutation.error.response?.data?.message || "Update failed" : mutation.isSuccess ? "Profile updated successfully." : "Only the fields shown here can be changed."}</p>
          <button disabled={mutation.isPending} className="primary-button"><Save size={18} /> {mutation.isPending ? "Saving..." : "Save changes"}</button>
        </div>
      </form>
    </section>
  </main>;
};

const ProfileInput = ({ icon, label, type = "text", value, onChange }) => {
  if (type === "checkbox") return <label className="profile-field flex-row items-center"><input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-teal-600" /><span>{label}</span></label>;
  if (type === "select") return <label className="profile-field"><span>{label}</span><select value={value || ""} onChange={(event) => onChange(event.target.value)}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></label>;
  if (type === "textarea") return <label className="profile-field md:col-span-2"><span>{label}</span><textarea rows="3" value={value || ""} onChange={(event) => onChange(event.target.value)} /></label>;
  return <label className="profile-field"><span>{label}</span><div className="relative">{icon && <i>{icon}</i>}<input required type={type} value={value ?? ""} onChange={(event) => onChange(type === "number" ? Number(event.target.value) : event.target.value)} /></div></label>;
};

export default ProfilePage;
