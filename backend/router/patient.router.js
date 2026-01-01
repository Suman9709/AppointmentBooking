
import express from "express";
import { bookAppointment, cancelAppointment, getPatientAppointments, getPatientProfile, loginPatient, signupPatient, updatePatientProfile } from "../controller/patient.controller.js";
import { get } from "mongoose";


const patientRouter = express.Router();
patientRouter.post("/patientRegister", signupPatient)
patientRouter.post("/patientLogin", loginPatient)
patientRouter.get("/getPatientDetails", getPatientProfile)
patientRouter.put("/updatePatientProfile", updatePatientProfile)
patientRouter.post("/bookAppointment", bookAppointment)
patientRouter.get("/getPatientAppointments", getPatientAppointments)
patientRouter.delete("/cancelAppointment/:appointmentId", cancelAppointment)


export default patientRouter;