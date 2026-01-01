import express from 'express';
import { doctorLogin, doctorLogout, getDoctorProfile, updateDoctorProfile } from '../controller/doctor.controller.js';

const doctorRouter = express.Router();

doctorRouter.get('/getdoctorprofile', getDoctorProfile)
doctorRouter.post('/login', doctorLogin)
doctorRouter.post('/logout', doctorLogout)
doctorRouter.post('/updateprofile', updateDoctorProfile)

export default doctorRouter;