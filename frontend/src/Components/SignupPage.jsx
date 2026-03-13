import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import Button from './Button';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const SignupPage = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [patientContact, setPatientContact] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [gender, setGender] = useState("")


  const signupMutation = useSignup();


  const handleSubmit = (e) => {
    e.preventDefault()

    signupMutation.mutate({
      patientName: name,
      patientEmail: email,
      patientPassword: password,
      patientContact: patientContact,
      patientAge: patientAge,
      gender: gender
    })

  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-[#f8f6f7] mt-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md md:max-w-lg p-6 md:p-8 rounded-2xl flex flex-col gap-6 shadow-xl backdrop-blur-xl bg-linear-to-b from-sky-100 via-sky-50 to-white"
      >

        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          Sign Up
        </h1>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Name</label>
          <div className="relative">
            <FaUserAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <div className="relative">
            <MdEmail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Contact</label>
          <div className="relative">
            <FaPhoneAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={patientContact}
              onChange={(e) => setPatientContact(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Age</label>
          <div className="relative">
            <BsCalendar2Date className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>
        </div>
        {/* gender */}

        <div className="flex flex-col gap-1">
          <label className="font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full pl-3 pr-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-sky-400 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</ option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Password</label>
          <div className="relative">
            <IoIosLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <Button
          name="Sign Up"
          type="submit"
          bgColor="bg-gray-900"
          textColor="text-white"
          className="w-full rounded-xl"
        />

        {/* Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold relative after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default SignupPage