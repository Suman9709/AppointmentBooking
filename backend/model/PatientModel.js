import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    contact: {
        type: String,
        required: true,
    },

    address: {
        type: String,
    },

    parentName: {
        type: String,
    },

}, { timestamps: true });


// INDEX

patientSchema.index({ userId: 1 });

const Patient = mongoose.model(
    "Patient",
    patientSchema
);

export default Patient;