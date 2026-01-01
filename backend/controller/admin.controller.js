import User from "../model/userModel.js";

export const createDoctor = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingDoctor = await User.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor with this email already exists" });
        }
        const newDoctor = await User.create({
            name,
            email,
            password,
            role: 'DOCTOR'
        });
        res.status(201).json({
            success: true,
            data: {
                newDoctor
            },
            message: "Doctor created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" + error.message });
    }

}

export const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const { name, email, isActive } = req.body;
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'DOCTOR') {
            return res.status(404).json({ message: "Doctor not found" });
        }
        doctor.name = name || doctor.name;
        doctor.email = email || doctor.email;
        if (typeof isActive === 'boolean') {
            doctor.isActive = isActive;
        }
        await doctor.save();
        res.status(200).json({
            success: true,
            data: {
                doctor
            },
            message: "Doctor updated successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}
export const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'DOCTOR') {
            return res.status(404).json({ message: "Doctor not found" });
        }
        await User.findByIdAndDelete(doctorId);
        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'DOCTOR' }).select('-password');
        res.status(200).json({
            success: true,
            data: {
                doctors
            },
            message: "Doctors fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" + error.message });
    }
}


// get total number of patient per doctor