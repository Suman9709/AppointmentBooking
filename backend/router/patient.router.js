import express from "express";

import {
    bookAppointment,
    cancelAppointment,
    getPatientAppointments,
    getPatientProfile,
    loginPatient,
    patientLogout,
    signupPatient,
    updatePatientProfile
} from "../controller/patient.controller.js";

import { verifyJWT } from "../middleware/middleware.js";

const patientRouter = express.Router();


// ================= AUTH =================

patientRouter.post("/patientRegister", signupPatient);

patientRouter.post("/patientLogin", loginPatient);

// FIXED
patientRouter.post("/patientlogout", patientLogout);



// ================= PROFILE =================

patientRouter.get(
    "/getPatientDetails",
    verifyJWT,
    getPatientProfile
);

patientRouter.put(
    "/updatePatientProfile",
    verifyJWT,
    updatePatientProfile
);



// ================= APPOINTMENTS =================

patientRouter.post(
    "/bookAppointment",
    verifyJWT,
    bookAppointment
);

patientRouter.get(
    "/getPatientAppointments",
    verifyJWT,
    getPatientAppointments
);

patientRouter.delete(
    "/cancelAppointment/:appointmentId",
    verifyJWT,
    cancelAppointment
);


export default patientRouter;