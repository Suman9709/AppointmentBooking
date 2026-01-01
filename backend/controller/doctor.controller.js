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
        const isPasswordMMatched = await user.comparePassword(password);
        if (!isPasswordMMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = user.generateJWTToken();
        console.log("doctor Login token: ", token);
        res.cookie("doctortoken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
        })
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
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to view profile" });
        }
        res.status(200).json({
            success: true,
            data: {
                loggedInUser
            },
            message: "Doctor profile fetched successfully",
        })
    } catch (error) {

    }
}

export const updateDoctorProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found, please login to update profile" });
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
        const token = req.cookies.doctortoken;
        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }
        res.clearCookie("doctortoken");
        res.status(200).json({
            success: true,
            message: "Doctor Logout successful",
        })
    } catch (error) {

    }
}