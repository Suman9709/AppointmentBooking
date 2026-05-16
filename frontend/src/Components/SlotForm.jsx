import React, { useState } from "react";

const SlotForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-bold mb-4">Create Slot</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded-lg"
            >
              Create
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default SlotForm;