import React from "react";
import { FaUserMd } from "react-icons/fa";
import { MdDateRange, MdAccessTime } from "react-icons/md";

const AppointmentCard = ({ doctor, date, time, status }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-lg transition">

      <div className="flex items-center gap-4">
        <FaUserMd className="text-3xl text-blue-700" />

        <div>
          <h3 className="font-semibold text-lg text-gray-800">{doctor}</h3>
          <div className="text-sm text-gray-500 flex gap-4 mt-1">
            <span className="flex items-center gap-1">
              <MdDateRange /> {date}
            </span>
            <span className="flex items-center gap-1">
              <MdAccessTime /> {time}
            </span>
          </div>
        </div>
      </div>

      <div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "Upcoming"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;