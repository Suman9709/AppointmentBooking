
import mongoose from "mongoose";


const doctorSlotSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

/* Prevent duplicate slots */
doctorSlotSchema.index(
    { doctorId: 1, date: 1, startTime: 1 },
    { unique: true }
);

const DoctorSlot = mongoose.model("DoctorSlot", doctorSlotSchema);
export default DoctorSlot;