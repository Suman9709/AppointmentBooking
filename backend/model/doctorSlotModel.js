import mongoose from "mongoose";

const doctorSlotSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
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

    status: {
        type: String,
        enum: [
            "AVAILABLE",
            "BOOKED",
            "CANCELLED"
        ],
        default: "AVAILABLE"
    },

}, { timestamps: true });


// INDEXES

doctorSlotSchema.index({
    doctorId: 1,
    startDateTime: 1,
    endDateTime: 1,
});


// VALIDATION + OVERLAP CHECK

doctorSlotSchema.pre("save", async function () {

    // VALIDATE TIME

    if (this.startDateTime >= this.endDateTime) {
        throw new Error(
            "Start time must be before end time"
        );
    }

    // CHECK OVERLAP

    const overlappingSlot =
        await mongoose.models.DoctorSlot.findOne({

            doctorId: this.doctorId,

            _id: { $ne: this._id },

            startDateTime: {
                $lt: this.endDateTime
            },

            endDateTime: {
                $gt: this.startDateTime
            }
        });

    if (overlappingSlot) {
        throw new Error(
            "Slot overlaps with an existing slot"
        );
    }
});

// PREVENT MODEL RECOMPILATION

const DoctorSlot =
    mongoose.models.DoctorSlot ||
    mongoose.model(
        "DoctorSlot",
        doctorSlotSchema
    );

export default DoctorSlot;