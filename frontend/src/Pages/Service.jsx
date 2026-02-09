import React from 'react'
import Button from '../Components/Button'
import ServiceCard from '../Components/ServiceCard'

const Service = () => {
    return (
        <section className="w-full py-16 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <span className="bg-white text-blue-800 rounded-full px-6 py-2 w-fit font-semibold text-sm sm:text-base">
                    Services
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                            Popular Services
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 max-w-xl">
                            We offer a range of medical services to cater to your health needs.
                        </p>
                    </div>

                    <Button
                        name="View All Services"
                        bgColor="bg-blue-800"
                        textColor="text-white"
                        className="rounded-full text-sm whitespace-nowrap"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceCard title="Massage Room" description="Lorem ipsum dolor sit amet." />
                    <ServiceCard title="Physiotherapy" description="Lorem ipsum dolor sit amet." />
                    <ServiceCard title="Dental Care" description="Lorem ipsum dolor sit amet." />
                    <ServiceCard title="General Checkup" description="Lorem ipsum dolor sit amet." />
                </div>
            </div>

            {/*  ABOUT SECTION  */}
            <div className="max-w-7xl mx-auto mt-20 bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:px-16">
                <div className="flex flex-col lg:flex-row gap-10 items-center">

                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                        <img
                            src="https://via.placeholder.com/500x400"
                            alt="Diagnostic equipment"
                            className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <span className="bg-white rounded-full px-6 py-2 w-fit font-semibold shadow-md text-sm sm:text-base text-blue-800">
                            Services
                        </span>

                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                            Diagnostic and physiotherapy equipment
                        </h1>

                        <div className="text-sm sm:text-base text-gray-600 space-y-3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>

                        <Button
                            name="Learn more"
                            bgColor="bg-blue-800"
                            textColor="text-white"
                            className="w-fit rounded-full text-sm mt-2"
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Service
