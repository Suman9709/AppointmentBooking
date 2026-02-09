import React from 'react'

const ServiceCard = ({ title, description, imageUrl }) => {
    return (
        <div className='w-full rounded-2xl border-b-16 border-blue-800 rounded-b-4xl overflow-hidden shadow-sm hover:shadow-md transition'>

            {/* Image Section */}
            <div className='h-48 w-full'>
                <img
                    src={imageUrl}
                    alt={title}
                    className='h-full w-full object-cover'
                />
            </div>

            {/* Content Section */}
            <div className='p-4 flex flex-col gap-2'>
                <h2 className='text-lg font-semibold'>
                    {title}
                </h2>

                <p className='text-sm text-gray-600'>
                    {description}
                </p>

                <button className='mt-2 w-fit text-blue-800 font-medium hover:underline'>
                    Read More →
                </button>
            </div>
        </div>
    )
}

export default ServiceCard
