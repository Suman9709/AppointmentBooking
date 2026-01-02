import AppointmentForm from "../model/appointmentFormModel";
import Patient from "../model/PatientModel";

export const signupPatient = async (req, res) => {
    try {

        const existingUser = await Patient.findOne({ patientEmail })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const { patientName, patientEmail, patientPassword, patientContact, patientParentsName, patientAge } = req.body;

        if (!patientName || !patientEmail || !patientPassword || !patientContact || !patientAge) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPatient = await Patient.create({
            patientName,
            patientEmail,
            patientPassword,
            patientContact,
            patientParentsName,
            patientAge

        });
        const token = newPatient.generateJWTToken();

        res.cookie("patienttoken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
        },
        )
        res.status(201).json({
            success: true,
            data: {
                newPatient
            },
            message: "Patient registered successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}

export const loginPatient = async (req, res) => {
    try {
        const { patientEmail, patientPassword } = req.body;

        if (!patientEmail || !patientPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const patient = await Patient.findOne({ patientEmail });
        if (!patient) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordMMatched = await patient.comparePassword(patientPassword);
        if (!isPasswordMMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = patient.generateJWTToken();
        console.log("patient token", token);

        res.cookie("patienttoken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
        },
        )
        res.status(200).json({
            success: true,
            data: {
                patient
            },
            message: "Patient logged in successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}

export const getPatientProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to view profile" });
        }

        return res.status(200).json({
            success: true,
            data: { loggedInUser },
            message: "Patient profile fetched successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}

export const updatePatientProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to update profile" });
        }

        Object.keys(req.body).forEach((key) => { loggedInUser[key] = req.body[key] });
        await loggedInUser.save();

        return res.status(200).json({
            success: true,
            data: { loggedInUser },
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
            return res.status(404).json({ message: "User not found, please login to book appointment" });
        }
        const { doctorId, appointmentDate, appointmentTime, reasonForVisit } = req.body;

        if (!doctorId || !appointmentDate || !appointmentTime || !reasonForVisit) {
            return res.status(400).json({ message: "All fields are required to book an appointment" });
        }
        const newAppointment = await AppointmentForm.create({
            patientId: loggedInUser._id,
            doctorId,
            appointmentDate,
            appointmentTime,
            reasonForVisit,
            status: "Scheduled"
        });
        res.status(201).json({
            success: true,
            data: {
                newAppointment
            },
            message: "Appointment booked successfully",
        })  
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
 }

export const getPatientAppointments = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to view appointments" });
        }
        const appointments = await AppointmentForm.find({ patientId: loggedInUser._id });
        res.status(200).json({
            success: true,
            data: {
                appointments
            },
            message: "Patient appointments fetched successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const loggedInUser = req.user;

        if (!loggedInUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login to cancel appointment"
            });
        }

        const appointmentId = req.params.id;

        const appointment = await AppointmentForm.findOne({
            _id: appointmentId,
            patientId: loggedInUser._id
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        if (appointment.status === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Appointment is already cancelled"
            });
        }

        appointment.status = "Cancelled";
        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            data: appointment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


export const patientLogout = async (req, res) => {
    try {
        const token = req.cookies.patienttoken;
        if (!token) {
            return res.status(400).json({ message: "Not logged in" });
        }
        res.clearCookie("patienttoken");
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}
