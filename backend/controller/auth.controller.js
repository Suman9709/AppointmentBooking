import User from "../model/userModel.js";


export const adminRegister = async (req, res) => {
    try {
        //check if the admin is craeted first
        const existingAdmin = await User.findOne({ role: 'ADMIN' });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //create new admin
        const newAdmin = await User.create({
            name,
            email,
            password,
            role: 'ADMIN'
        })
        //create token
        const token = newAdmin.generateJWTToken();

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
        },
        )

        res.status(201).json({
            success: true,
            data: {
                newAdmin
            },
            message: "Admin registered successfully",

        })

    } catch (error) {
        res.status(500).json({ message: "Server Error" + error.message });
    }
};
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordMMatched = await user.comparePassword(password);
        if (!isPasswordMMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = user.generateJWTToken();
        console.log("Login token: ", token);
        res.cookie("admintoken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
        },
        )
        res.status(200).json({
            success: true,
            data: {
                user
            },
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" + error.message });
    }


};
export const adminLogout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Not logged in" });
        }
        res.clearCookie("admintoken");
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" + error.message });
    }
};
