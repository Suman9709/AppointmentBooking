import React, { useState } from "react";
import { X } from "lucide-react";

const CreateDoctor = ({ isOpen, onClose, onSubmit, departments }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        departmentId: "",
        specialization: "",
        experience: "",
        qualifications: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        if (onSubmit) {
            onSubmit(formData);
        }

        setFormData({
            name: "",
            email: "",
            password: "",
            departmentId: "",
            specialization: "",
            experience: "",
            qualifications: "",
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 relative animate-in fade-in zoom-in duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-semibold mb-5 text-center">
                    Create Doctor
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        name="name"
                        placeholder="Doctor Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Doctor Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    />

                    <select
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    >
                        <option value="">
                            Select Department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department._id}
                                value={department._id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    />

                    <input
                        type="number"
                        name="experience"
                        placeholder="Experience (years)"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    />

                    <input
                        type="text"
                        name="qualifications"
                        placeholder="Qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
                        required
                    />

                    <div className="flex gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDoctor;