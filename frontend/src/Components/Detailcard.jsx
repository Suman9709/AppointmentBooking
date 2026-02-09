import React from 'react'

const Detailcard = ({ name, description, image }) => {
  return (
    <div className="
      w-full
      bg-white
      rounded-2xl
      shadow-md
      p-4 sm:p-5
      flex
      flex-col sm:flex-row
      items-start sm:items-center
      gap-3 sm:gap-4
    ">

      {/* Icon / Image */}
      <img
        src={image || 'https://via.placeholder.com/64'}
        alt={name}
        className="
          w-10 h-10
          sm:w-12 sm:h-12
          md:w-14 md:h-14
          object-contain
        "
      />

      {/* Text Content */}
      <div className="flex flex-col gap-1">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold">
          {name}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  )
}

export default Detailcard
