import Doctor from "../model/doctorModel.js";
import User from "../model/userModel.js";
import DoctorSlot from "../model/doctorSlotModel.js";
import AppointmentForm from "../model/appointmentFormModel.js";
import { parseIndianDateTime } from "../utils/dateTime.js";


export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user || user.role !== 'DOCTOR') {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is deactivated"
            });
        }
        const isPasswordMMatched = await user.comparePassword(password);
        if (!isPasswordMMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = user.generateJWTToken();
        console.log("doctor Login token: ", token);
        res.cookie("doctortoken", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        res.status(200).json({
            success: true,
            data: {
                user
            },
            message: "Login successful",
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" + error.message });
    }
}


export const getDoctorProfile = async (req, res) => {
    try {

        const loggedinUser = req.user;

        if (!req.user || req.user.role !== "DOCTOR") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const doctorProfile = await Doctor.findOne({ userId: loggedinUser._id }).populate("departmentId", "name");
        if (!doctorProfile) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                loggedinUser,
                doctorProfile,
            },
            message: "Doctor profile fetched successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateDoctorProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to update profile" });
        }

        const doctorProfile = await Doctor.findOne({ userId: loggedInUser._id });

        if (!doctorProfile) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }
        const { name, email, specialization, experience, qualifications, isAvailable } = req.body;
        if (name !== undefined) loggedInUser.name = name;
        if (email !== undefined) loggedInUser.email = email;

        if (specialization !== undefined) doctorProfile.specialization = specialization;
        if (experience !== undefined) doctorProfile.experience = experience;
        if (qualifications !== undefined) doctorProfile.qualifications = qualifications;
        if (isAvailable !== undefined) doctorProfile.isAvailable = isAvailable;

        await Promise.all([loggedInUser.save(), doctorProfile.save()]);

        res.json({
            message: `${loggedInUser.name}'s profile updated successfully`,
            data: { loggedinUser: loggedInUser, doctorProfile },
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" + error.message });
    }
}


export const doctorLogout = async (req, res) => {
    try {

        res.clearCookie("doctortoken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return res.status(200).json({
            success: true,
            message: "Doctor logout successful",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getDoctorDashboardAnalytics = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user._id });
        if (!doctor) return res.status(404).json({ success: false, message: "Doctor profile not found" });

        const now = new Date();
        const indiaDate = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
        }).format(now);
        const utcStart = parseIndianDateTime(indiaDate, "00:00");
        const utcEnd = new Date(utcStart.getTime() + (24 * 60 * 60 * 1000));

        const [appointments, availableSlots, todaysAppointments, statuses] = await Promise.all([
            AppointmentForm.countDocuments({ doctorId: doctor._id }),
            DoctorSlot.countDocuments({ doctorId: doctor._id, status: "AVAILABLE", startDateTime: { $gt: now } }),
            AppointmentForm.find({ doctorId: doctor._id })
                .populate("patientId", "name email")
                .populate("slotId")
                .sort({ createdAt: -1 })
                .lean(),
            AppointmentForm.aggregate([
                { $match: { doctorId: doctor._id } },
                { $group: { _id: "$status", value: { $sum: 1 } } },
            ]),
        ]);

        const today = todaysAppointments.filter(({ slotId }) => slotId?.startDateTime >= utcStart && slotId?.startDateTime < utcEnd);
        return res.json({
            success: true,
            data: {
                totals: { appointments, availableSlots, today: today.length },
                statusBreakdown: statuses.map(({ _id, value }) => ({ name: _id, value })),
                todaysAppointments: today,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
