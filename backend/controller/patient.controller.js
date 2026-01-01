import AppointmentForm from "../model/appointmentFormModel";

export const signupPatient = async (req, res) => {
    try {

        const existingUser = await AppointmentForm.findOne({ patientEmail })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const { patientName, patientEmail, patientPassword, patientContact, patientParentsName, patientAge } = req.body;

        if (!patientName || !patientEmail || !patientPassword || !patientContact || !patientAge) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPatient = await AppointmentForm.create({
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
        const patient = await AppointmentForm.findOne({ patientEmail });
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

    } catch (error) {

    }
}

export const bookAppointment = async (req, res) => { }

export const getPatientAppointments = async (req, res) => { }

export const cancelAppointment = async (req, res) => { }

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
