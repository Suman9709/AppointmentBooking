import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const verifyJWT = async (
    req,
    res,
    next
) => {
    try {

        // TOKENS

        const adminToken = req.cookies.admintoken;

        const doctorToken =req.cookies.doctortoken;

        const patientToken =req.cookies.patienttoken;


        // PICK TOKEN

        const token =
            adminToken ||
            doctorToken ||
            patientToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Unauthorized, no token",
            });
        }


        // VERIFY TOKEN

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // FIND USER

        const user = await User.findById(decoded.userId).select("-password");


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // CHECK ACTIVE

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message:
                    "User account is deactivated",
            });
        }


        // STORE USER

        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message:
                "Unauthorized, invalid token",
        });
    }
};



// ================= ADMIN =================

export const isAdmin = (
    req,
    res,
    next
) => {

    if (req.user.role !== "ADMIN") {

        return res.status(403).json({
            success: false,
            message:
                "Admin access required",
        });
    }

    next();
};



// ================= DOCTOR =================

export const isDoctor = (
    req,
    res,
    next
) => {

    if (req.user.role !== "DOCTOR") {

        return res.status(403).json({
            success: false,
            message:
                "Doctor access required",
        });
    }

    next();
};



// ================= PATIENT =================

export const isPatient = (
    req,
    res,
    next
) => {

    if (req.user.role !== "PATIENT") {

        return res.status(403).json({
            success: false,
            message:
                "Patient access required",
        });
    }

    next();
};