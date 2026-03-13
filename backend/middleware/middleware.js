import User from "../model/userModel.js";
import Patient from "../model/PatientModel.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
    try {

        const token =
            req.cookies.admintoken ||
            req.cookies.doctortoken ||
            req.cookies.patienttoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized, no token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user;

        // ADMIN / DOCTOR
        if (decoded.userId) {
            user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (!user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: "User is deactivated"
                });
            }
        }

        // PATIENT
        else if (decoded.patientId) {
            user = await Patient
                .findById(decoded.patientId)
                .select("-patientPassword");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Patient not found"
                });
            }
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized, invalid token"
        });
    }
};

export const isAdmin = (req, res, next) => {

    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Forbidden, admin access required"
        });
    }

    next();
};

export const isDoctor = (req, res, next) => {

    if (!req.user || req.user.role !== "DOCTOR") {
        return res.status(403).json({
            success: false,
            message: "Forbidden, doctor access required"
        });
    }

    next();
};

export const isPatient = (req, res, next) => {

    if (!req.cookies.patienttoken) {
        return res.status(403).json({
            success: false,
            message: "Forbidden, patient access required"
        });
    }

    next();
};