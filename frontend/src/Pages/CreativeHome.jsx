import React from "react";

import { ArrowRight, CalendarCheck2, Clock3, HeartPulse, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  [<CalendarCheck2 />, "Book in a few clicks", "Browse live department slots and choose a time that works for you."],
  [<Stethoscope />, "Trusted specialists", "Clear doctor profiles, departments and availability in one calm place."],
  [<ShieldCheck />, "Private by design", "Role-protected sessions and secure HTTP-only cookie authentication."],
];

const CreativeHome = () => <>
  <main className="page-shell pt-6">
    <section className="relative isolate overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-teal-950/20 md:px-14 md:py-20">
      <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-teal-400/25 blur-3xl" /><div className="absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div><p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-teal-200 ring-1 ring-white/15"><Sparkles size={15} /> Healthcare, thoughtfully connected</p><h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">Your health deserves <span className="text-teal-300">less waiting.</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">Find the right department, reserve a verified appointment, and manage your care from one beautifully simple workspace.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/patientlogin" className="primary-button bg-teal-400 text-slate-950 hover:bg-teal-300">Book an appointment <ArrowRight size={18} /></Link><a href="#how-it-works" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">See how it works</a></div></div>
        <div className="relative mx-auto w-full max-w-md"><div className="absolute inset-8 rounded-full bg-teal-300/20 blur-3xl" /><img src="/image/doctor.png" alt="Healthcare professional" className="relative mx-auto max-h-[30rem] object-contain drop-shadow-2xl" /><div className="glass-card absolute bottom-5 left-0 flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-800"><span className="rounded-xl bg-emerald-100 p-2 text-emerald-700"><Clock3 /></span><div><strong className="block">Live availability</strong><small className="text-slate-500">Times shown in IST</small></div></div></div>
      </div>
    </section>

    <section id="how-it-works" className="py-20"><div className="mb-10 max-w-2xl"><p className="eyebrow text-teal-700">Designed around people</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">Care without the clutter.</h2><p className="mt-4 text-slate-600">Every step has been shaped to feel clear, quick and reassuring.</p></div><div className="grid gap-5 md:grid-cols-3">{features.map(([icon, title, description], index) => <article key={title} className="glass-card group rounded-3xl p-7 hover:-translate-y-1"><div className="mb-8 flex items-center justify-between"><span className="rounded-2xl bg-teal-50 p-3 text-teal-700 group-hover:bg-teal-700 group-hover:text-white">{icon}</span><span className="text-4xl font-black text-slate-100">0{index + 1}</span></div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{description}</p></article>)}</div></section>

    <section className="grid overflow-hidden rounded-[2rem] bg-linear-to-br from-teal-700 to-teal-950 text-white md:grid-cols-2"><div className="p-8 md:p-12"><HeartPulse className="mb-6 text-teal-200" size={38} /><p className="eyebrow text-teal-200">One connected platform</p><h2 className="mt-3 text-3xl font-black">A better view for every role.</h2><p className="mt-4 leading-7 text-teal-50/80">Patients manage visits, doctors see their day clearly, and administrators understand the entire care network through live analytics.</p></div><div className="grid grid-cols-3 border-t border-white/10 md:border-l md:border-t-0">{[["3", "role workspaces"], ["24/7", "self-service"], ["IST", "accurate timing"]].map(([value, label]) => <div key={label} className="grid place-content-center border-r border-white/10 p-4 text-center last:border-0"><strong className="text-2xl md:text-3xl">{value}</strong><span className="mt-2 text-xs text-teal-100/70">{label}</span></div>)}</div></section>
  </main>
</>;

export default CreativeHome;

