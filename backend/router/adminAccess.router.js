import express from 'express'
import { createDoctor, getAllDoctors } from '../controller/admin.controller.js';

const adminAccessRouter = express.Router();

adminAccessRouter.post('/create/doctor', createDoctor)
adminAccessRouter.get('/getall/doctors', getAllDoctors)

export default adminAccessRouter;