import mongoose from "mongoose";

const appointmentFormSchema = new mongoose.Schema({

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorSlot",
        required: true
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    appointmentSlot: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    }

}, { timestamps: true });

appointmentFormSchema.index(
  { slotId: 1, appointmentDate: 1 },
  { unique: true }
);

const AppointmentForm = mongoose.model("AppointmentForm", appointmentFormSchema);
export default AppointmentForm;
