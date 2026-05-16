import Doctor from "../model/doctorModel.js";
import User from "../model/userModel.js";


export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
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
            secure: false,
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

        const doctorProfile = await Doctor.findOne({
            userId: user._id
        });

        if (!doctorProfile) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }
        Object.keys(req.body).forEach((key) => { loggedInUser[key] = req.body[key] });

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.name}'s profile updated successfully`,
            data: loggedInUser,
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
            secure: false,
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