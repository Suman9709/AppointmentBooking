import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const menu = {
    public: [
      { name: 'Home', link: '/' },
      { name: 'Login', link: '/login' },
      { name: 'Register', link: '/register' }
    ],
    admin: [
      { name: 'Dashboard', link: '/admindashboard' },
      { name: 'Create Doctors', link: '/managedoctors' },
      { name: 'Doctor List', link: '/doctorlist' }
    ],
    doctor: [
      { name: 'Dashboard', link: '/doctordashboard' },
      { name: 'Appointments', link: '/appointments' },
      { name: 'Patients', link: '/patients' }
    ],
    patient: [
      { name: 'Dashboard', link: '/patientdashboard' },
      { name: 'Book Appointment', link: '/bookappointment' },
      { name: 'My Doctors', link: '/mydoctors' },
      { name: 'My Appointments', link: '/myappointments' },

    ]
  }
  const menuToShow = menu['public']; // Change 'public' to 'admin', 'doctor', or 'patient' based on user role

  const [ismobilemenu, setIsmobilemenu] = useState(false);
  return (
    <div className='flex  justify-between px-3 py-2 md:px-12 md:py-2 items-center'>
      <div>
        {/* logo  */}
        <img src="/image/logo.png" alt="" className='w-12 h-12 md:w-20 md:h-20' />
      </div>
      {/* Navitem */}
      <div className=' hidden md:flex space-x-6 text-lg font-medium'>
        {
          menuToShow.map((menuItem) => (
            <Link key={menuItem.name} to={menuItem.link}>{menuItem.name}</Link>
          ))
        }
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden'>
        <button onClick={() => setIsmobilemenu(!ismobilemenu)}>
          {ismobilemenu ? (
            <img src='/image/cross.png' alt="close menu" className='w-8 h-8' />
          ) : (
            <img src="/image/hamburg.png" alt="menu" className='w-8 h-8' />

          )}
        </button>
        {
          ismobilemenu && (
            <div className='absolute top-16 right-4 bg-white shadow-lg rounded-lg flex flex-col space-y-4 p-4'>
              {
                menuToShow.map((menuItem) => (
                  <Link key={menuItem.name} to={menuItem.link} onClick={() => setIsmobilemenu(false)}>{menuItem.name}</Link>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar