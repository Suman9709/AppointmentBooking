import express from 'express';
import { doctorLogin, doctorLogout, getDoctorProfile, updateDoctorProfile } from '../controller/doctor.controller.js';
import { verifyDoctorJWT } from '../middleware/middleware.js';

const doctorRouter = express.Router();

doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/getdoctorprofile',verifyDoctorJWT, getDoctorProfile)
doctorRouter.post('/updateprofile', verifyDoctorJWT, updateDoctorProfile)
doctorRouter.post('/logout', verifyDoctorJWT, doctorLogout)

export default doctorRouter;