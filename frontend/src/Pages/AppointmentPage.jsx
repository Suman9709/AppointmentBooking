import React from 'react'
import Button from '../Components/Button'

const AppointmentPage = () => {
    return (
        <div className="w-full px-4 sm:px-6 md:px-10 py-10 bg-gray-50">

            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800">
                    Book Your Appointment
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                    Schedule your visit with our expert doctors at your convenience
                </p>
            </div>

            {/* Main Container */}
            <div className="flex flex-col sm:flex-row gap-8 items-stretch max-w-6xl mx-auto">

                {/* Left Image */}
                <div className="hidden sm:block w-full sm:w-1/2">
                    <div className="h-full min-h-105 max-h-130">
                        <img
                            src="https://images.unsplash.com/photo-1588776814546-9b8a69c3e309?auto=format&fit=crop&w=800&q=80"
                            alt="Doctor Appointment"
                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Right Form */}
                <div className="w-full sm:w-1/2 bg-white rounded-2xl shadow-xl p-4 sm:p-5 self-stretch">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-3">
                        Book Your Appointment
                    </h2>
                    <p className="text-gray-600 mb-5 text-sm sm:text-base">
                        Fill out the form below to schedule an appointment with our medical experts.
                    </p>

                    <form className="flex flex-col gap-1">

                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Date */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Department */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">
                                Department
                            </label>
                            <select
                                className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Department</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="dermatology">Dermatology</option>
                                <option value="neurology">Neurology</option>
                                <option value="pediatrics">Pediatrics</option>
                            </select>
                        </div>

                        {/* Time Slot */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">
                                Time Slot
                            </label>
                            <select
                                className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Time Slot</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="13:00">01:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                                <option value="17:00">05:00 PM</option>
                            </select>
                        </div>

                        {/* Button */}
                        <Button
                            name="Book Appointment"
                            bgColor="bg-blue-800"
                            textColor="text-white"
                            className="w-full rounded-full text-sm py-2.5 mt-3"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentPage
