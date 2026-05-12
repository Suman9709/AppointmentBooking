// import User from "../model/userModel.js";


// export const adminRegister = async (req, res) => {
//     try {
//         //check if the admin is craeted first
//         const existingAdmin = await User.findOne({ role: 'ADMIN' });

//         if (existingAdmin) {
//             return res.status(400).json({ message: "Admin already exists" });
//         }

//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         //create new admin
//         const newAdmin = await User.create({
//             name,
//             email,
//             password,
//             role: 'ADMIN'
//         })
//         //create token
//         const token = newAdmin.generateJWTToken();

//         res.cookie("admintoken", token, {
//             httpOnly: true,
//             expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
//         },
//         )

//         res.status(201).json({
//             success: true,
//             data: {
//                 newAdmin
//             },
//             message: "Admin registered successfully",

//         })

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" + error.message });
//     }
// };
// export const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         const isPasswordMMatched = await user.comparePassword(password);
//         if (!isPasswordMMatched) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         const token = user.generateJWTToken();
//         console.log("Login token: ", token);
//         res.cookie("admintoken", token, {
//             httpOnly: true,
//             expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
//         },
//         )
//         res.status(200).json({
//             success: true,
//             data: {
//                 user
//             },
//             message: "Login successful",
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" + error.message });
//     }


// };
// export const adminLogout = async (req, res) => {
//     try {
//         const token = req.cookies.admintoken;
//         if (!token) {
//             return res.status(400).json({ message: "Not logged in" });
//         }
//         res.clearCookie("admintoken");
//         res.status(200).json({
//             success: true,
//             message: "Logout successful",
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" + error.message });
//     }
// };



import User from "../model/userModel.js";


// ================= REGISTER ADMIN =================

export const adminRegister = async (
    req,
    res
) => {

    try {

        // CHECK EXISTING ADMIN

        const existingAdmin =
            await User.findOne({
                role: "ADMIN"
            });

        if (existingAdmin) {

            return res.status(400).json({

                success: false,

                message:
                    "Admin already exists"

            });
        }


        const {
            name,
            email,
            password
        } = req.body;


        // VALIDATION

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"

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
                sameSite: "lax",

                expires: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                )
            }
        );


        return res.status(201).json({

            success: true,

            message:
                "Admin registered successfully",

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

export const adminLogin = async (
    req,
    res
) => {

    try {

        const {
            email,
            password
        } = req.body;


        // VALIDATION

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"

            });
        }


        // FIND ADMIN

        const user =
            await User.findOne({

                email,
                role: "ADMIN"

            });


        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid credentials"

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
                sameSite: "lax",

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
                sameSite: "lax",
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