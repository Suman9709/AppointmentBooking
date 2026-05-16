
import User from "../model/userModel.js";


// ================= REGISTER ADMIN =================

export const adminRegister = async (req,res) => {

    try {

        // CHECK EXISTING ADMIN

        const existingAdmin =await User.findOne({role: "ADMIN"});

        if (existingAdmin) {

            return res.status(400).json({
                success: false,
                message:"Admin already exists"
            });
        }
        const {name,email,password} = req.body;
        // VALIDATION
        if (!name ||!email ||!password) {

            return res.status(400).json({
                success: false,
                message:"All fields are required"
            });
        }
        // CREATE ADMIN

        const newAdmin =
            await User.create({
                name,
                email,
                password,
                role: "ADMIN"

            });


        // GENERATE TOKEN

        const token =
            newAdmin.generateJWTToken();


        // STORE COOKIE

        res.cookie(
            "admintoken",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "None",

                expires: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                )
            }
        );


        return res.status(201).json({
            success: true,
            message:"Admin registered successfully",
            data: {
                admin: {
                    _id: newAdmin._id,
                    name: newAdmin.name,
                    email: newAdmin.email,
                    role: newAdmin.role
                }
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



// ================= ADMIN LOGIN =================

export const adminLogin = async (req,res) => {

    try {
        const {email,password} = req.body;
        // VALIDATION

        if (!email ||!password) {

            return res.status(400).json({
                success: false,
                message:"All fields are required"

            });
        }


        // FIND ADMIN

        const user =await User.findOne({email,role: "ADMIN"});


        if (!user) {

            return res.status(400).json({

                success: false,

                message:"Invalid credentials"

            });
        }


        // CHECK PASSWORD

        const isPasswordMatched =
            await user.comparePassword(
                password
            );


        if (!isPasswordMatched) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid credentials"

            });
        }


        // GENERATE TOKEN

        const token =
            user.generateJWTToken();


        // STORE COOKIE

        res.cookie(
            "admintoken",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "None",

                expires: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                )
            }
        );


        return res.status(200).json({

            success: true,

            message:
                "Admin login successful",

            data: {
                admin: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
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



// ================= Admin Profile =================

export const adminProfile = async (req, res) => {
    try {
        const admin = req.user;

        if (!req.user || req.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!admin) {
            return res.status(401).json({

                success: false,
                message: "Admin not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: admin,
            message: "Admin profile fetched successfully"
        })



    } catch (error) {
        return res.status(500).json({

            success: false,
            message: "Server Error: " +
                error.message
        });
    }
}

// ================= ADMIN LOGOUT =================

export const adminLogout = async (
    req,
    res
) => {

    try {

        res.clearCookie(
            "admintoken",
            {
                httpOnly: true,
                secure: false,
                sameSite: "None",
            }
        );


        return res.status(200).json({

            success: true,

            message:
                "Admin logout successful"

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