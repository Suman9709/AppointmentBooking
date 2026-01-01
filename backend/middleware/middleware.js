import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies.admintoken || req.cookies.doctortoken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: "User is deactivated" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

}

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: "Forbidden, admin access required" });
    }
    next();
}

export const isDoctor = (req, res, next) => {
    if (req.user.role !== 'DOCTOR') {
        return res.status(403).json({ message: "Forbidden, doctor access required" });
    }
    next();
}