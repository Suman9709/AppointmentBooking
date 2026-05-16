import Doctor from "../model/doctorModel.js";
import DoctorSlot from "../model/doctorSlotModel.js";
import User from "../model/userModel.js";

export const createDoctor = async (req, res) => {

    try {

        const {
            email,
            name,
            password,
            departmentId,
            specialization,
            experience,
            qualifications
        } = req.body;


        // REQUIRED FIELDS

        if (
            !email ||
            !name ||
            !password ||
            !departmentId ||
            !specialization
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        // CHECK EXISTING USER

        const existingDoctor =
            await User.findOne({ email });

        if (existingDoctor) {

            return res.status(400).json({
                success: false,
                message:
                    "Doctor already exists"
            });
        }


        // CREATE USER

        const newDoctorUser =
            await User.create({

                name,
                email,
                password,
                role: "DOCTOR"

            });


        // CREATE DOCTOR PROFILE

        const doctorProfile =
            await Doctor.create({

                userId: newDoctorUser._id,

                departmentId,

                specialization,

                experience,

                qualifications

            });


        return res.status(201).json({

            success: true,

            message:
                "Doctor created successfully",

            data: {
                user: newDoctorUser,
                doctorProfile
            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server Error: " +
                error.message

        });
    }
};


export const updateDoctor = async (
    req,
    res
) => {

    try {

        const doctorId = req.params.id;

        const {
            name,
            email,
            isActive,
            specialization,
            experience,
            qualifications,
            departmentId
        } = req.body;


        // FIND USER

        const doctorUser =
            await User.findById(doctorId);

        if (
            !doctorUser ||
            doctorUser.role !== "DOCTOR"
        ) {

            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }


        // UPDATE USER DATA

        doctorUser.name =
            name || doctorUser.name;

        doctorUser.email =
            email || doctorUser.email;

        doctorUser.isActive =
            isActive ?? doctorUser.isActive;

        await doctorUser.save();


        // FIND PROFILE

        const doctorProfile =
            await Doctor.findOne({
                userId: doctorId
            });

        if (!doctorProfile) {

            return res.status(404).json({
                success: false,
                message:
                    "Doctor profile not found"
            });
        }


        // UPDATE PROFILE

        doctorProfile.specialization =
            specialization ||
            doctorProfile.specialization;

        doctorProfile.experience =
            experience ||
            doctorProfile.experience;

        doctorProfile.qualifications =
            qualifications ||
            doctorProfile.qualifications;

        doctorProfile.departmentId =
            departmentId ||
            doctorProfile.departmentId;


        await doctorProfile.save();


        return res.status(200).json({

            success: true,

            message:
                "Doctor updated successfully",

            data: {
                doctorUser,
                doctorProfile
            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server Error: " +
                error.message

        });
    }
};


export const deleteDoctor = async (
    req,
    res
) => {

    try {

        const doctorId = req.params.id;


        // FIND USER

        const doctorUser =
            await User.findById(doctorId);

        if (
            !doctorUser ||
            doctorUser.role !== "DOCTOR"
        ) {

            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }


        // FIND PROFILE

        const doctorProfile =
            await Doctor.findOne({
                userId: doctorId
            });

        if (!doctorProfile) {

            return res.status(404).json({
                success: false,
                message:
                    "Doctor profile not found"
            });
        }


        // DELETE SLOTS

        await DoctorSlot.deleteMany({
            doctorId: doctorProfile._id
        });


        // DELETE PROFILE

        await Doctor.findByIdAndDelete(
            doctorProfile._id
        );


        // DELETE USER

        await User.findByIdAndDelete(
            doctorId
        );


        return res.status(200).json({

            success: true,

            message:
                "Doctor deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server Error: " +
                error.message

        });
    }
};


export const getAllDoctors = async (
    req,
    res
) => {

    try {

        const doctors =
            await Doctor.find()

                .populate({
                    path: "userId",
                    select:
                        "-password"
                })

                .populate({
                    path: "departmentId",
                    select: "name"
                });


        return res.status(200).json({

            success: true,

            message:
                "Doctors fetched successfully",

            data: doctors

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server Error: " +
                error.message

        });
    }
};

export const getAllSlotsForAdmin = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);


        const totalSlotsToday = await DoctorSlot.countDocuments({
            startDateTime: { $gte: startOfDay, $lte: endOfDay }
        })

        return res.status(200).json({

            success: true,
            totalSlotsToday

        });
    } catch (error) {
        return res.status(500).json({

            success: false,
            message:
                "Error fetching today's slots",
            error: error.message
        });
    }
}


export const getAdminTotalAppointments = async (req, res) => {
    try {

        const totalAppointments =
            await Appointment.countDocuments();

        return res.status(200).json({
            success: true,
            totalAppointments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


