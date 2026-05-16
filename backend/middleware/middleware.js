import jwt from "jsonwebtoken";
import User from "../model/userModel.js";


// export const verifyJWT = async (req, res, next) => {
//     try {

//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized"
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         if (!user.isActive) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Account disabled"
//             });
//         }

//         req.user = {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: decoded.role
//         };

//         next();

//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid token"
//         });
//     }
// };



export const verifyAdminJWT = async (req, res, next) => {
    try {

        const token = req.cookies.admintoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Admin unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId);

        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid admin token"
        });
    }
};


export const verifyDoctorJWT = async (req, res, next) => {
    try {
        const token = req.cookies.doctortoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Doctor unauthorized"
            });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== "DOCTOR") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid doctor token"
        });
    }
}

export const verifyPatientJWT = async (req, res, next) => {
    try {
        const token = req.cookies.patienttoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Patient unauthorized"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user || user.role !== "PATIENT") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid patient token"
        });
    }
}