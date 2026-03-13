import React from 'react'
import { FaUserCircle } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"

const ProfileCard = ({ name, age, gender, contact, GuardianName, address, onEdit,email }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 border border-gray-100">

      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">

        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-blue-700" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500">Patient Profile</p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FiEdit />
          Edit
        </button>

      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 text-gray-700">

        <div>
          <p className="text-sm text-gray-500">Age</p>
          <p className="font-semibold text-lg">{age}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-semibold text-lg">{gender}</p>
        </div>
         <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold text-lg">{email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Contact</p>
          <p className="font-semibold text-lg">{contact}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Guardian Name</p>
          <p className="font-semibold text-lg">{GuardianName}</p>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-semibold text-lg">{address}</p>
        </div>

      </div>

    </div>
  )
}

export default ProfileCard