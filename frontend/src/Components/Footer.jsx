import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 mt-16">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            MediCare+
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            MediCare+ is a modern doctor appointment platform that helps patients
            book appointments easily and securely with trusted medical professionals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Book Appointment</li>
            <li className="hover:text-white cursor-pointer">Doctors</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Our Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Online Consultation</li>
            <li className="hover:text-white cursor-pointer">Health Checkups</li>
            <li className="hover:text-white cursor-pointer">Emergency Care</li>
            <li className="hover:text-white cursor-pointer">24/7 Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: support@medicare.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-blue-800"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300">
        <p>
          © {new Date().getFullYear()} MediCare+. All rights reserved.
        </p>

      </div>

    </footer>
  )
}

export default Footer
