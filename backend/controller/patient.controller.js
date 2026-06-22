import AppointmentForm from "../model/appointmentFormModel.js";
import DoctorSlot from "../model/doctorSlotModel.js";
import Patient from "../model/PatientModel.js";
import User from "../model/userModel.js";


export const signupPatient = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            gender,
            age,
            contact,
            address,
            parentName
        } = req.body;

        if (!name || !email || !password || !gender || !age || !contact) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role: "PATIENT"
        });

        const patientProfile = await Patient.create({
            userId: newUser._id,
            gender,
            age,
            contact,
            address,
            parentName
        });

        const token = newUser.generateJWTToken();

        // ✅ FIX: SINGLE COOKIE SYSTEM
        res.cookie("patienttoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            data: {
                user: newUser,
                patientProfile
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const loginPatient = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({
            email,
            role: "PATIENT"
        }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account disabled"
            });
        }

        const isPasswordMatched =
            await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = user.generateJWTToken();

        // ✅ FIX: SAME COOKIE NAME
        res.cookie("patienttoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        const patientProfile =
            await Patient.findOne({ userId: user._id });

        return res.status(200).json({
            success: true,
            message: "Patient login successful",
            data: {
                user: user,
                patientProfile
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPatientProfile = async (
    req,
    res
) => {

    try {

        const user = req.user;


        const patientProfile =
            await Patient.findOne({

                userId: user._id

            });


        return res.status(200).json({

            success: true,

            message:
                "Patient profile fetched successfully",

            data: {
                user,
                patientProfile
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


export const updatePatientProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to update profile" });
        }

        const { name, email, age, gender, contact, address, parentName } = req.body;
        if (name !== undefined) loggedInUser.name = name;
        if (email !== undefined) loggedInUser.email = email;
        await loggedInUser.save();

        const patientProfile = await Patient.findOneAndUpdate(
            { userId: loggedInUser._id },
            { age, gender, contact, address, parentName },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            data: { user: loggedInUser, patientProfile },
            message: "Patient profile updated successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}

export const bookAppointment = async (req, res) => {

    try {

        const loggedInUser = req.user;

        if (!loggedInUser) {

            return res.status(401).json({

                success: false,
                message:
                    "Please login to book appointment"
            });
        }

        const {
            slotId,
            doctorId
        } = req.body;

        if (!slotId || !doctorId) {

            return res.status(400).json({

                success: false,
                message:
                    "Slot and doctor are required"
            });
        }

        // Claim the slot atomically so two simultaneous requests cannot both book it.
        const slot = await DoctorSlot.findOneAndUpdate(
            { _id: slotId, doctorId, status: "AVAILABLE", startDateTime: { $gt: new Date() } },
            { status: "BOOKED" },
            { new: true }
        );

        if (!slot) {

            return res.status(404).json({

                message:
                    "Slot is unavailable, expired, or does not belong to this doctor"
            });
        }


        // CREATE APPOINTMENT
        let newAppointment;
        try {
            newAppointment = await AppointmentForm.create({

                slotId,

                patientId:
                    loggedInUser._id,

                doctorId,

                status: "confirmed"
            });
        } catch (error) {
            // Release the claimed slot if appointment creation fails.
            await DoctorSlot.findByIdAndUpdate(slotId, { status: "AVAILABLE" });
            throw error;
        }


        return res.status(201).json({

            success: true,

            data: newAppointment,

            message:
                "Appointment booked successfully"
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server Error " + error.message
        });
    }
};

export const getPatientAppointments = async (req, res) => {

    try {

        const loggedInUser = req.user;

        if (!loggedInUser) {

            return res.status(401).json({

                success: false,

                message:
                    "Please login to view appointments"
            });
        }

        const appointments =
            await AppointmentForm.find({

                patientId: loggedInUser._id

            })

                .populate({

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
                })

                .populate("slotId")

                .sort({
                    createdAt: -1
                });

        return res.status(200).json({

            success: true,

            data: appointments,

            message:
                "Patient appointments fetched successfully"
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server Error " + error.message
        });
    }
};

export const cancelAppointment = async (req, res) => {

    try {

        const loggedInUser = req.user;

        if (!loggedInUser) {

            return res.status(401).json({

                success: false,

                message:
                    "Unauthorized. Please login to cancel appointment"
            });
        }

        const appointmentId = req.params.appointmentId;

        const appointment =
            await AppointmentForm.findOne({

                _id: appointmentId,

                patientId: loggedInUser._id
            });

        if (!appointment) {

            return res.status(404).json({

                success: false,

                message:
                    "Appointment not found"
            });
        }

        // CHECK ALREADY CANCELLED

        if (appointment.status === "cancelled") {

            return res.status(400).json({

                success: false,

                message:
                    "Appointment already cancelled"
            });
        }

        if (!["pending", "confirmed"].includes(appointment.status)) {
            return res.status(400).json({ success: false, message: "This appointment can no longer be cancelled" });
        }

        const slot = await DoctorSlot.findById(appointment.slotId);
        if (slot?.startDateTime <= new Date()) {
            return res.status(400).json({ success: false, message: "Past appointments cannot be cancelled" });
        }

        // UPDATE STATUS

        appointment.status = "cancelled";

        // FREE THE SLOT

        await DoctorSlot.findByIdAndUpdate(

            appointment.slotId,

            {
                status: "AVAILABLE"
            }
        );

        await appointment.save();

        return res.status(200).json({

            success: true,

            message:
                "Appointment cancelled successfully",

            data: appointment
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Server error",

            error: error.message
        });
    }
};

export const patientLogout = async (req, res) => {
    try {

        const token = req.cookies.patienttoken;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Not logged in"
            });
        }

        res.clearCookie("patienttoken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPatientDashboardAnalytics = async (req, res) => {
    try {
        const statuses = await AppointmentForm.aggregate([
            { $match: { patientId: req.user._id } },
            { $group: { _id: "$status", value: { $sum: 1 } } },
        ]);
        const upcoming = await AppointmentForm.find({ patientId: req.user._id, status: { $in: ["pending", "confirmed"] } })
            .populate("slotId", "startDateTime")
            .lean();
        return res.json({
            success: true,
            data: {
                total: statuses.reduce((sum, item) => sum + item.value, 0),
                upcoming: upcoming.filter(({ slotId }) => slotId?.startDateTime > new Date()).length,
                statusBreakdown: statuses.map(({ _id, value }) => ({ name: _id, value })),
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
