import mongoose from "mongoose";

import Doctor from "../model/doctorModel.js";
import DoctorSlot from "../model/doctorSlotModel.js";



// ================= CREATE SLOT =================


export const createSlot = async (
    req,
    res
) => {

    try {

        const user = req.user;

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // FIND DOCTOR PROFILE

        const doctor =
            await Doctor.findOne({
                userId: user._id
            });

        if (!doctor) {

            return res.status(404).json({
                success: false,
                message:
                    "Doctor profile not found"
            });
        }

        const {
            date,
            startTime,
            endTime
        } = req.body;

        if (
            !date ||
            !startTime ||
            !endTime
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "All fields are required"
            });
        }

        // CREATE DATETIME

        const startDateTime =
            new Date(
                `${date}T${startTime}:00`
            );

        const endDateTime =
            new Date(
                `${date}T${endTime}:00`
            );

        // VALIDATION

        if (
            startDateTime >= endDateTime
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Start time must be before end time"
            });
        }

        // CHECK OVERLAP

        const overlappingSlot =
            await DoctorSlot.findOne({

                doctorId:
                    doctor._id,

                startDateTime: {
                    $lt: endDateTime
                },

                endDateTime: {
                    $gt: startDateTime
                }
            });

        if (overlappingSlot) {

            return res.status(400).json({
                success: false,
                message:
                    "Slot overlaps with existing slot"
            });
        }

        // CREATE SLOT

        const slot =
            await DoctorSlot.create({

                doctorId:
                    doctor._id,

                startDateTime,

                endDateTime
            });

        return res.status(201).json({

            success: true,

            message:
                "Slot created successfully",

            slot
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};



// ================= GET ALL DOCTOR SLOTS =================

export const getAllSlots = async (req,res) => {

    try {

        const user = req.user;

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const doctor =
            await Doctor.findOne({
                userId: user._id
            });

        if (!doctor) {

            return res.status(404).json({
                success: false,
                message:
                    "Doctor profile not found"
            });
        }


        const currentDateTime = new Date();
        const slots =
            await DoctorSlot.find({

                doctorId: doctor._id,
                endDateTime:{
                    $gte: currentDateTime
                }

            }).sort({
                startDateTime: 1
            });

        return res.status(200).json({

            success: true,

            slots
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Error fetching slots",

            error: error.message
        });
    }
};



// ================= GET SLOT BY ID =================

export const getSlotById = async (
    req,
    res
) => {

    try {

        const user = req.user;

        const { id } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid slot ID"
            });
        }

        const doctor =
            await Doctor.findOne({
                userId: user._id
            });

        const slot =
            await DoctorSlot.findOne({

                _id: id,

                doctorId: doctor._id

            });

        if (!slot) {

            return res.status(404).json({

                success: false,

                message: "Slot not found"
            });
        }

        return res.status(200).json({

            success: true,

            slot
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Error fetching slot",

            error: error.message
        });
    }
};



// ================= UPDATE SLOT =================

export const updateSlotById = async (
    req,
    res
) => {

    try {

        const user = req.user;

        const { id } = req.params;

        const {
            date,
            startTime,
            endTime
        } = req.body;

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid slot ID"
            });
        }

        const doctor =
            await Doctor.findOne({
                userId: user._id
            });

        const slot =
            await DoctorSlot.findOne({

                _id: id,

                doctorId: doctor._id
            });

        if (!slot) {

            return res.status(404).json({
                success: false,
                message: "Slot not found"
            });
        }

        // BUILD DATETIME

        const updatedStart =
            startTime
                ? new Date(
                    `${date}T${startTime}:00`
                )
                : slot.startDateTime;

        const updatedEnd =
            endTime
                ? new Date(
                    `${date}T${endTime}:00`
                )
                : slot.endDateTime;

        // VALIDATION

        if (updatedStart >= updatedEnd) {

            return res.status(400).json({

                success: false,

                message:
                    "Start time must be before end time"
            });
        }

        // OVERLAP CHECK

        const overlappingSlot =
            await DoctorSlot.findOne({

                _id: { $ne: id },

                doctorId: doctor._id,

                startDateTime: {
                    $lt: updatedEnd
                },

                endDateTime: {
                    $gt: updatedStart
                }
            });

        if (overlappingSlot) {

            return res.status(400).json({

                success: false,

                message:
                    "Updated slot overlaps"
            });
        }

        slot.startDateTime =
            updatedStart;

        slot.endDateTime =
            updatedEnd;

        const updatedSlot =
            await slot.save();

        return res.status(200).json({

            success: true,

            message:
                "Slot updated successfully",

            slot: updatedSlot
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Error updating slot",

            error: error.message
        });
    }
};



// ================= DELETE SLOT =================

export const deleteSlotById = async (
    req,
    res
) => {

    try {

        const user = req.user;

        const { id } = req.params;

        const doctor =
            await Doctor.findOne({
                userId: user._id
            });

        const slot =
            await DoctorSlot.findOneAndDelete({

                _id: id,

                doctorId: doctor._id
            });

        if (!slot) {

            return res.status(404).json({

                success: false,

                message: "Slot not found"
            });
        }

        return res.status(200).json({

            success: true,

            message:
                "Slot deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Error deleting slot",

            error: error.message
        });
    }
};



// ================= GET SLOTS BY DEPARTMENT =================

export const getSlotByDepartment =
    async (req, res) => {

        try {

            const {
                departmentId
            } = req.params;

            // FIND DOCTORS

            const doctors =
                await Doctor.find({

                    departmentId

                });

            const doctorIds =
                doctors.map(
                    doctor => doctor._id
                );

            // FIND AVAILABLE SLOTS


            const currentDateTime = new Date();
            const slots =
                await DoctorSlot.find({
                    doctorId: {
                    $in: doctorIds
                    },
                    endDateTime: {
                    $gte: currentDateTime,
                    },
                    status: "AVAILABLE"
                }).populate({

                    path: "doctorId",

                    populate: [
                        {
                            path: "userId",
                            select: "name email"
                        },
                        {
                            path: "departmentId",
                            select: "name"
                        }
                    ]
                }).sort({
                    startDateTime: 1
                });

            return res.status(200).json({
                success: true,
                slots
            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    "Error fetching slots",

                error: error.message
            });
        }
    };