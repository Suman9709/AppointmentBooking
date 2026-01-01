import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import authRouter from './router/auth.router.js';
import cookieParser from 'cookie-parser';
import doctorRouter from './router/doctor.router.js';
import { isAdmin, verifyJWT } from './middleware/middleware.js';
import adminAccessRouter from './router/adminAccess.router.js';
import sloutRouter from './router/slot.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();


//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
//routes
app.use('/api/auth', authRouter)
app.use('/api/adminaccess', verifyJWT, isAdmin, adminAccessRouter)
app.use('/api/doctor', verifyJWT, doctorRouter)
app.use('/api/doctor/slots', verifyJWT, sloutRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})