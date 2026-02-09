import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f7]">
      <Navbar />
      <main style={{ minHeight: "80vh", }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout