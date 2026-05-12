import mongoose from "mongoose";

const doctorSlotSchema = new mongoose.Schema({
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
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["AVAILABLE", "BOOKED", "CANCELLED"],
        default: "AVAILABLE"
    },
}, { timestamps: true });

// 🔹 Index for performance
doctorSlotSchema.index({
    doctorId: 1,
    startDateTime: 1,
});
doctorSlotSchema.index({ departmentId: 1, startDateTime: 1 });

// 🔹 Validation
doctorSlotSchema.pre("save", function (next) {
    if (this.startDateTime >= this.endDateTime) {
        return next(new Error("Start time must be before end time"));
    }
    next();
});


// prevent overlapping slots for the same doctor

doctorSlotSchema.pre('save', async function (next) {
    const overlappingSlot = await mongoose.model('DoctorSlot').findOne({
        doctorId: this.doctorId,
        _id: { $ne: this._id },
        startDateTime: { $lt: this.endDateTime },
        endDateTime: { $gt: this.startDateTime }
    });

    if (overlappingSlot) {
        return next(new Error("Slot overlaps with an existing slot"));
    }

    next();
})

const DoctorSlot = mongoose.model("DoctorSlot", doctorSlotSchema);
export default DoctorSlot;