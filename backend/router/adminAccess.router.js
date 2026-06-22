import express from 'express'
import { createDoctor, getAdminDashboardAnalytics, getAllDoctors, getAllSlotsForAdmin } from '../controller/admin.controller.js';
import { verifyAdminJWT } from '../middleware/middleware.js';

const adminAccessRouter = express.Router();

adminAccessRouter.post('/create/doctor',verifyAdminJWT, createDoctor)
adminAccessRouter.get('/getall/doctors', verifyAdminJWT, getAllDoctors)
adminAccessRouter.get('/getallslots', verifyAdminJWT, getAllSlotsForAdmin)
adminAccessRouter.get('/dashboard-analytics', verifyAdminJWT, getAdminDashboardAnalytics)

export default adminAccessRouter;
