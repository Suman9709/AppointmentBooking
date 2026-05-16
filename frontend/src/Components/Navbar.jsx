import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { usePatient } from '../hooks/usePatient'
import { useAdmin } from '../hooks/useAdmin'
// import { useDoctor } from '../hooks/useDoctor'

import { useLogout } from '../hooks/useLogout'
import { useDoctor } from '../hooks/useDoctor'

const Navbar = () => {

  // ================= FETCH USERS =================

  const { data: patientData } = usePatient()

  const { data: adminData } = useAdmin()

  // const { data: doctorData } = useDoctor()

  const { data: doctorData } = useDoctor()

  // ================= USER DATA =================

  const patient =
    patientData?.user || null

  const admin =
    adminData?.data || null



  const doctor =
    doctorData?.data?.loggedinUser || null

  // const doctorProfile =
  //   doctorData?.data?.doctorProfile || null



  // ================= ROLE =================

  const role = useMemo(() => {

    if (admin?.role === "ADMIN") {
      return "ADMIN"
    }

    if (doctor?.role === "DOCTOR") {
      return "DOCTOR"
    }

    if (patient?.role === "PATIENT") {
      return "PATIENT"
    }

    return null

  }, [admin, doctor, patient])

  const loggedInUser = useMemo(() => {

    switch (role) {

      case "ADMIN":
        return admin

      case "DOCTOR":
        return doctor

      case "PATIENT":
        return patient

      default:
        return null
    }

  }, [role, admin, doctor, patient])

  // ================= LOGOUT =================

  const logoutMutation = useLogout()



  // ================= MENUS =================

  const menu = {

    public: [
      { name: 'Home', link: '/' },
    ],

    admin: [
      { name: 'Home', link: '/' },
      { name: 'Dashboard', link: '/admindashboard' },
      { name: 'Create Doctors', link: '/managedoctors' },
      { name: 'Doctor List', link: '/doctorlist' }
    ],

    doctor: [
      { name: 'Home', link: '/' },
      { name: 'Dashboard', link: '/doctordashboard' },
      { name: 'Appointments', link: '/appointments' },
      { name: 'Patients', link: '/patients' }
    ],

    patient: [
      { name: 'Home', link: '/' },
      { name: 'Dashboard', link: '/patientdashboard' },
      // { name: 'Book Appointment', link: '/bookappointment' },
      // { name: 'My Doctors', link: '/mydoctors' },
      { name: 'My Appointments', link: '/patientdashboard#myappointments' },
    ]
  }



  // ================= MENU TO SHOW =================

  const menuToShow = useMemo(() => {

    if (admin) {
      return menu.admin
    }

    if (doctor) {
      return menu.doctor
    }

    if (patient) {
      return menu.patient
    }

    return menu.public

  }, [admin, doctor, patient])



  // ================= AVATAR =================

  const avatarLetter = useMemo(() => {
    return loggedInUser?.name?.charAt(0)?.toUpperCase()
  }, [loggedInUser])

  // ================= MOBILE MENU =================

  const [ismobilemenu, setIsmobilemenu] = useState(false)

  return (

    <div className="w-full px-4 mt-6">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 md:px-8 border border-gray-200 rounded-full bg-linear-to-r from-white via-sky-100 via-70% to-white backdrop-blur-xl shadow-md">

        {/* ================= LOGO ================= */}

        <Link to="/">
          <img
            src="/image/logo.png"
            alt="logo"
            className="w-12 h-12 md:w-14 md:h-14"
          />
        </Link>



        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden md:flex items-center gap-6 text-lg font-medium">

          {menuToShow.map((menuItem) => (

            <Link
              key={menuItem.name}
              to={menuItem.link}
              className="hover:text-sky-600 transition duration-200">
              {menuItem.name}
            </Link>

          ))}

        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="hidden md:flex items-center gap-4">

          {loggedInUser && (

            <div className="w-10 h-10 rounded-full border-2 border-sky-500 bg-sky-100 flex justify-center items-center">

              <p className="font-bold text-sky-700">
                {avatarLetter}
              </p>

            </div>

          )}

          {loggedInUser ? (

            <button
              onClick={() =>
                logoutMutation.mutate(role)
              }
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer">
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="font-medium hover:text-sky-600 transition duration-200">
              Login
            </Link>

          )}

        </div>



        {/* ================= MOBILE MENU ================= */}

        <div className="md:hidden relative">

          <button
            onClick={() =>
              setIsmobilemenu(!ismobilemenu)
            }
          >

            {ismobilemenu ? (

              <img
                src="/image/cross.png"
                alt="close"
                className="w-6 h-6"
              />

            ) : (

              <img
                src="/image/hamburg.png"
                alt="menu"
                className="w-6 h-6"
              />

            )}
          </button>
          {/* ================= MOBILE DROPDOWN ================= */}

          {ismobilemenu && (

            <div className="absolute right-0 top-12 bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4 min-w-55 z-50">

              {menuToShow.map((menuItem) => (

                <Link
                  key={menuItem.name}
                  to={menuItem.link}
                  onClick={() =>
                    setIsmobilemenu(false)
                  }
                  className="hover:text-sky-600 transition">
                  {menuItem.name}
                </Link>

              ))}
              {loggedInUser ? (
                <>
                  <p className="font-semibold text-sky-700">
                    {
                      loggedInUser?.name
                        ?.split(" ")[0]
                    }
                  </p>

                  <button
                    onClick={() =>
                      logoutMutation.mutate(role)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition">
                    Logout
                  </button>

                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() =>
                    setIsmobilemenu(false)
                  }
                  className="hover:text-sky-600 transition">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar