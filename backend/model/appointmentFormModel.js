import mongoose from "mongoose";

const appointmentFormSchema = new mongoose.Schema({

    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorSlot",
        required: true,
        unique: true
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    }

}, { timestamps: true });

appointmentFormSchema.index({ patientId: 1 });

const AppointmentForm = mongoose.model("AppointmentForm", appointmentFormSchema);
export default AppointmentForm;
