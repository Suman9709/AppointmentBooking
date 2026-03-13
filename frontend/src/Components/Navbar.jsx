import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePatient } from '../hooks/usePatient'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

  const { data } = usePatient()


  const patient = data?.loggedInUser || null
  const logoutMutation = useLogout()

  console.log(patient);

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
      { name: 'Book Appointment', link: '/bookappointment' },
      { name: 'My Doctors', link: '/mydoctors' },
      { name: 'My Appointments', link: '/myappointments' },
    ]
  }

  // show menu depending on login
  const menuToShow = patient ? menu.patient : menu.public

  const [ismobilemenu, setIsmobilemenu] = useState(false)

  return (
    <div className="w-full px-4 mt-6">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 md:px-8 border bg-linear-to-r from-white via-sky-100 via-70% to-white border-gray-200 rounded-full backdrop-blur-xl">

        {/* Logo */}
        <img src="/image/logo.png" alt="" className="w-12 h-12 md:w-14 md:h-14" />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          {menuToShow.map((menuItem) => (
            <Link
              key={menuItem.name}
              to={menuItem.link}
              className="hover:text-gray-600"
            >
              {menuItem.name}
            </Link>
          ))}
        </div>

        {/* Right Side User Section */}
        <div className="hidden md:flex items-center gap-4">

          {patient && (
           <div className='border-2 rounded-full px-4 py-2 '>
             <p className="font-semibold  ">
              {patient.patientName?.charAt(0).toUpperCase()}
            </p>
           </div>
          )}

          {patient ? (
            <button
                    onClick={() => logoutMutation.mutate()}
                    className="text-white p-2  font-medium text-center cursor-pointer border-0 rounded-lg bg-red-600"
                  >
                    Logout
                  </button>
          ) : (
            <Link
              to="/login"
              className="font-medium hover:text-gray-600"
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button onClick={() => setIsmobilemenu(!ismobilemenu)}>
            {ismobilemenu ? (
              <img src="/image/cross.png" alt="close menu" className="w-6 h-6" />
            ) : (
              <img src="/image/hamburg.png" alt="menu" className="w-6 h-6" />
            )}
          </button>

          {ismobilemenu && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg flex flex-col space-y-4 p-4">

              {menuToShow.map((menuItem) => (
                <Link
                  key={menuItem.name}
                  to={menuItem.link}
                  onClick={() => setIsmobilemenu(false)}
                  className="hover:text-gray-600"
                >
                  {menuItem.name}
                </Link>
              ))}

              {/* Mobile Login / Logout */}
              {patient ? (
                <>
                  <p className="font-semibold">
                    {patient.patientName?.split(" ")[0]}
                  </p>
                  <button
                    onClick={() => logoutMutation.mutate()}
                    className="text-white p-2  font-medium text-center cursor-pointer border-0 rounded-lg bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsmobilemenu(false)}
                  className="hover:text-gray-600"
                >
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