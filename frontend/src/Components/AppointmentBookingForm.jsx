import React, { use, useState } from "react";
import { CalendarDays, Clock3, User, Phone, MapPin } from "lucide-react";
import { useAllDepartments } from "../hooks/useAllDepartments";
import { useGetSlotByDepartment } from "../hooks/useGetSlotByDepartment";
import { useBookAppointment } from "../hooks/useBookAppointment";

const AppointmentBookingForm = ({
    patient,
    departments,
    slots,
    onSubmit,
    loading,
}) => {


    const [formData, setFormData] = useState({
        patientName: patient?.name || "",
        fatherName: patient?.fatherName || "",
        contactNumber: patient?.contactNumber || "",
        address: patient?.address || "",
        departmentId: "",
        slotId: "",
    });



    const { data: allDepartments } = useAllDepartments()

    const departmentOptions = allDepartments?.departments || [];


    const { data: getSlotsByDepartment } = useGetSlotByDepartment(formData.departmentId)

    const totalSlots = getSlotsByDepartment?.slots || []


    const bookingMutation = useBookAppointment();
    const filteredSlots = slots.filter(
        (slot) =>
            slot.doctorId?.departmentId?._id === formData.departmentId
    );

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.slotId) {

            alert("Please select slot");

            return;
        }

        const selectedSlot =
            totalSlots.find(
                slot => slot._id === formData.slotId
            );

        const appointmentData = {

            slotId: formData.slotId,

            doctorId:
                selectedSlot?.doctorId?._id
        };

        bookingMutation.mutate(
            appointmentData
        );
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 md:p-8 ">

            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">

                {/* HEADER */}

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Book Appointment
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill the details below to book your appointment
                    </p>
                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* PATIENT NAME */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Patient Name
                        </label>

                        <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50">

                            <User className="w-5 h-5 text-sky-600 mr-3" />

                            <input
                                type="text"
                                value={formData.patientName}
                                disabled
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* FATHER NAME */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Father Name
                        </label>

                        <input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            placeholder="Enter father name"
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>

                    {/* CONTACT */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Contact Number
                        </label>

                        <div className="flex items-center border rounded-xl px-4 py-3">

                            <Phone className="w-5 h-5 text-sky-600 mr-3" />

                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                className="w-full outline-none"
                            />
                        </div>
                    </div>

                    {/* ADDRESS */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Address
                        </label>

                        <div className="flex items-start border rounded-xl px-4 py-3">

                            <MapPin className="w-5 h-5 text-sky-600 mr-3 mt-1" />

                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className="w-full outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* DEPARTMENT */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Select Department
                        </label>

                        <select
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                        >

                            <option value="">
                                Choose Department
                            </option>

                            {departmentOptions?.map((department) => (

                                <option
                                    key={department._id}
                                    value={department._id}
                                >
                                    {department.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* SLOT */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Select Slot
                        </label>

                        <select
                            name="slotId"
                            value={formData.slotId}
                            onChange={handleChange}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                        >

                            <option value="">
                                Choose Slot
                            </option>

                            {totalSlots?.map((slot) => (

                                <option
                                    key={slot._id}
                                    value={slot._id}
                                >

                                    Dr. {slot.doctorId?.userId?.name}
                                    {" | "}

                                    {new Date(
                                        slot.startDateTime
                                    ).toLocaleDateString()}

                                    {" | "}

                                    {new Date(
                                        slot.startDateTime
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* SUBMIT */}

                    <button
                        type="submit"

                        disabled={
                            bookingMutation.isPending
                        }

                        className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-semibold transition duration-300"
                    >

                        {
                            bookingMutation.isPending
                                ? "Booking..."
                                : "Book Appointment"
                        }

                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentBookingForm;