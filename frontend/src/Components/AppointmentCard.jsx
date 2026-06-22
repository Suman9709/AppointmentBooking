import React from "react";
import { FaUserMd } from "react-icons/fa";
import { MdDateRange, MdAccessTime } from "react-icons/md";

const AppointmentCard = ({ doctor, date, time, status, canCancel, cancelling, onCancel }) => {
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

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>
        {canCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={cancelling}
            className="rounded-lg border border-red-200 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            {cancelling ? "Cancelling..." : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
