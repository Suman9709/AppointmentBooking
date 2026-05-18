import React, { useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

const SlotForm = ({ onClose, onSubmit }) => {

  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative">

        {/* HEADER */}

        <div className="mb-8 text-center">

          <h2 className="text-3xl font-bold text-gray-800">
            Create Slot
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Select appointment date and time
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* DATE */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Date
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500 transition">

              <CalendarDays className="w-5 h-5 text-sky-600 mr-3" />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* START TIME */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Start Time
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500 transition">

              <Clock3 className="w-5 h-5 text-sky-600 mr-3" />

              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* END TIME */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              End Time
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500 transition">

              <Clock3 className="w-5 h-5 text-sky-600 mr-3" />

              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition font-medium shadow-md cursor-pointer"
            >
              Create Slot
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SlotForm;