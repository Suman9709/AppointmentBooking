import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col text-slate-800">
      <Navbar />
      <main className='min-h-[80vh] grow' >
       <div>
         <Outlet />
       </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
