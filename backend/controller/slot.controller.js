import mongoose from "mongoose";
import DoctorSlot from "../model/doctorSlotModel.js";

export const createSlot = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized. Please login."
            });
        }

        const { date, startTime, endTime } = req.body;

        // 🔹 Basic validation
        if (!date || !startTime || !endTime) {
            return res.status(400).json({
                message: "Date, startTime and endTime are required"
            });
        }

        // 🔹 Convert into proper DateTime (IMPORTANT FIX)
        const slotStartDateTime = new Date(`${date}T${startTime}:00`);
        const slotEndDateTime = new Date(`${date}T${endTime}:00`);
        const now = new Date();

        // 🔹 Validate invalid date
        if (isNaN(slotStartDateTime) || isNaN(slotEndDateTime)) {
            return res.status(400).json({
                message: "Invalid date or time format"
            });
        }

        // 🔹 Start must be before end
        if (slotStartDateTime >= slotEndDateTime) {
            return res.status(400).json({
                message: "Start time must be earlier than end time"
            });
        }

        // 🔹 Prevent past slot
        if (slotStartDateTime < now) {
            return res.status(400).json({
                message: "Cannot create slot in the past"
            });
        }

        // 🔹 Overlapping check (FIXED using DateTime)
        const overlappingSlot = await DoctorSlot.findOne({
            doctorId: user._id,
            startDateTime: { $lt: slotEndDateTime },
            endDateTime: { $gt: slotStartDateTime }
        });

        if (overlappingSlot) {
            return res.status(400).json({
                message: "Slot overlaps with an existing slot"
            });
        }

        // 🔹 Create slot
        const newSlot = new DoctorSlot({
            doctorId: user._id,
            date: new Date(date), // optional (for filtering by date)
            startDateTime: slotStartDateTime,
            endDateTime: slotEndDateTime
        });

        const savedSlot = await newSlot.save();

        return res.status(201).json({
            message: "Slot created successfully",
            slot: savedSlot
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating slot",
            error: error.message
        });
    }
};

export const getAllSlots = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to view slots" });
        }
        const slots = await DoctorSlot.find({ doctorId: loggedInUser._id });
        return res.status(200).json({ slots });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching slots", error: error.message });
    }
}


export const getSlotById = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to view slot" });
        }

        const slotId = req.params.id;
        const slot = await DoctorSlot.findOne({ _id: slotId, doctorId: loggedInUser._id }).lean();
        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }
        return res.status(200).json({ slot });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching slot", error: error.message });
    }
}

export const updateSlotById = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to update slot" });
        }
        const slotId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({ message: "Invalid slot ID" });
        }

        const { startTime, endTime, date } = req.body;

        if (!date && !startTime && !endTime) {
            return res.status(400).json({
                message: "At least one field is required to update"
            });
        }


        if (startTime && endTime && startTime >= endTime) {
            return res.status(400).json({ message: "Start time must be earlier than end time" });
        }

        //fetch existing slot to be updated
        const slot = await DoctorSlot.findOne({ _id: slotId, doctorId: loggedInUser._id });
        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }
        // Object.keys(req.body).forEach((key) => { slot[key] = req.body[key]; });


        // Date validation
        if (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const slotDate = new Date(date);
            slotDate.setHours(0, 0, 0, 0);

            if (slotDate < today) {
                return res.status(400).json({
                    message: "Cannot update slot to a past date"
                });
            }
        }
        //Over lapping slot check
        const overlappingSlot = await DoctorSlot.findOne({
            _id: { $ne: slotId },
            doctorId: loggedInUser._id,
            date: date || slot.date,
            startTime: { $lt: endTime || slot.endTime },
            endTime: { $gt: startTime || slot.startTime }
        });

        if (overlappingSlot) {
            return res.status(400).json({
                message: "Updated slot overlaps with an existing slot"
            });
        }
        if (date) slot.date = date;
        if (startTime) slot.startTime = startTime;
        if (endTime) slot.endTime = endTime;

        const updatedSlot = await slot.save();
        return res.status(200).json({ message: "Slot updated successfully", slot: updatedSlot });
    } catch (error) {
        return res.status(500).json({ message: "Error updating slot", error: error.message });
    }
}
export const deleteSlotById = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to delete slot" });
        }
        const slotId = req.params.id;
        const slot = await DoctorSlot.findOneAndDelete({ _id: slotId, doctorId: loggedInUser._id });
        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }
        return res.status(200).json({ message: "Slot deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting slot", error: error.message });
    }
}