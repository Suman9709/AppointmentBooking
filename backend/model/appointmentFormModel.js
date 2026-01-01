import mongoose from 'mongoose';

const appointmentFormSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorSlot",
        required: true,
        unique: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    patientEmail: {
        type: String,

    },
    patientPassword:{
        type: String,
        required: true,
    },
    patientContact: {
        type: String,
        required: true,
    },
    patientParentsName: {
        type: String,
    },
    patientAge: {
        type: Number,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }


}, { timestamps: true });

const AppointmentForm = mongoose.model("AppointmentForm", appointmentFormSchema);
export default AppointmentForm;