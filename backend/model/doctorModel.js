import mongoose from "mongoose";


const doctorSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    departmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,     
    },
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;