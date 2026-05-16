import React from 'react'
import doctor from "/image/doctor.png"
import Button from '../Components/Button'
import { IoLocationOutline, IoCallOutline } from "react-icons/io5"
import { MdOutlineWatchLater } from "react-icons/md"
import About from './About'
import Service from './Service'
import AppointmentPage from './AppointmentPage'

const Home = () => {
  return (
    <div>
      <div
        className=" my-2 md:my-6 mx-4 sm:mx-6 lg:mx-10 rounded-2xl shadow-xl flex flex-col-reverse lg:flex-row gap-6  md:px-16 bg-[linear-gradient(to_right,transparent_0%,transparent_45%,#eef3ef_65%,#eef3ef_100%),linear-gradient(to_bottom,#eff9f0_0%,#eff9f0_40%,#eef3ef_60%,#eef3ef_100)]"
      >

        {/* LEFT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 px-6 py-2">

          <span className="
            bg-white
            rounded-full
            px-4 py-2
            w-fit
            font-semibold
            text-sm sm:text-base
          ">
            About us
          </span>

          <div>
            <h1 className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
            ">
              High Precision <br className="hidden sm:block" />
              diagnostics
            </h1>

            <p className="mt-3 text-sm sm:text-base font-semibold">
              Individual approach and care for your health and the key rules
              that guide every specialist of the medical center
            </p>
          </div>

          <Button
            name="Learn more"
            bgColor="bg-blue-800 text-white"
            className="
              w-full
              sm:w-1/2
              md:w-1/3
              rounded-full
            "
          />

          {/* INFO CARDS – SAME STRUCTURE */}
          <div className="
  flex
  gap-2
  overflow-x-auto
  lg:overflow-visible
">
            {/* Location */}
            <div className="
    flex
    items-center
    gap-1
    px-3 py-1.5
    bg-white
    border border-gray-100
    rounded-full
    shrink-0
  ">
              <IoLocationOutline className="bg-gray-100 p-1 text-lg rounded-full" />
              <span className="text-xs sm:text-sm font-semibold leading-tight">
                891 Fire Access Road <br /> New York
              </span>
            </div>

            {/* Call */}
            <div className="
    flex
    items-center
    gap-1
    px-3 py-1.5
    bg-white
    border border-gray-100
    rounded-full
    shrink-0
  ">
              <IoCallOutline className="bg-gray-100 p-1 text-lg rounded-full" />
              <span className="text-xs sm:text-sm font-semibold leading-tight">
                0000000000 <br /> 0000000000
              </span>
            </div>

            {/* Time */}
            <div className="
    flex
    items-center
    gap-1.5
    px-4 py-1.5
    bg-white
    border border-gray-100
    rounded-full
    shrink-0
  ">
              <MdOutlineWatchLater className="bg-gray-100 p-1 text-lg rounded-full" />
              <span className="text-xs sm:text-sm font-semibold leading-tight">
                10AM To 6PM <br /> Mon to Fri
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center ">
          <img
            src={doctor}
            alt="Doctor"
            className="
              w-64
              sm:w-80
              md:w-105
              lg:w-120
              object-contain
            "
          />
        </div>
      </div>

      <About />
      <Service />
      {/* <AppointmentPage /> */}

    </div>
  )
}

export default Home
