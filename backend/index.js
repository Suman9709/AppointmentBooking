import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import authRouter from './router/auth.router.js';
import cookieParser from 'cookie-parser';
import doctorRouter from './router/doctor.router.js';
// import { verifyAdminJWT, verifyDoctorJWT, verifyPatientJWT } from './middleware/middleware.js';
import adminAccessRouter from './router/adminAccess.router.js';
import sloutRouter from './router/slot.router.js';
import patientRouter from './router/patient.router.js';
import departmentRouter from './router/department.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();


//middleware
app.use(cors({
    origin: "http://localhost:5173" ||"https://appointmentbooking-mhku.onrender.com",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
//routes
app.use('/api/auth', authRouter)
app.use('/api/adminaccess',  adminAccessRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/doctor/slots', sloutRouter)
app.use('/api/patient', patientRouter)
app.use('/api/department', departmentRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});