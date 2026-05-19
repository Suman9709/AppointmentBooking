import React, { useState } from "react";
import { X } from "lucide-react";

const CreateDepartment = ({ isOpen, onClose, onSubmit
}) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ name });

        setName("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-semibold text-center mb-5">
                    Create Department
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Department Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring"
                        required
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-200 py-3 rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-sky-600 text-white py-3 rounded-xl"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDepartment;