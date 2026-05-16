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
import { verifyPatientJWT } from "../middleware/middleware.js";

// import { verifyJWT } from "../middleware/middleware.js";

const patientRouter = express.Router();


// ================= AUTH =================

patientRouter.post("/patientRegister", signupPatient);

patientRouter.post("/patientLogin", loginPatient);

// FIXED
patientRouter.post("/patientlogout", verifyPatientJWT, patientLogout);



// ================= PROFILE =================

patientRouter.get(
    "/getPatientDetails", verifyPatientJWT,
    getPatientProfile
);

patientRouter.put(
    "/updatePatientProfile", verifyPatientJWT,
    updatePatientProfile
);



// ================= APPOINTMENTS =================

patientRouter.post(
    "/bookAppointment",
    verifyPatientJWT,
    bookAppointment
);

patientRouter.get(
    "/getPatientAppointments", 
    verifyPatientJWT,
    getPatientAppointments
);

patientRouter.delete(
    "/cancelAppointment/:appointmentId",
    verifyPatientJWT,
    cancelAppointment
);


export default patientRouter;