import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
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

    isAvailable: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


// VALIDATION

doctorSchema.pre("save", async function () {

    const User = mongoose.model("User");

    const user = await User.findById(
        this.userId
    );

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role !== "DOCTOR") {
        throw new Error("User must have DOCTOR role");
    }

    // Returning from async middleware continues the save operation.
});


// INDEXES

doctorSchema.index({ userId: 1 });

doctorSchema.index({ departmentId: 1 });

const Doctor = mongoose.model(
    "Doctor",
    doctorSchema
);

export default Doctor;
