import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true,

        unique: true
    },
    patientPassword: {
        type: String,
        required: true
    },
    patientContact: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    }
}, {timestamps: true});


const Patient = mongoose.model("Patient", patientSchema);
export default Patient;