import express from "express";
import { adminLogin, adminLogout, adminProfile, adminRegister } from "../controller/auth.controller.js";
import { verifyAdminJWT } from "../middleware/middleware.js";

const authRouter = express.Router();

authRouter.post('/adminRegister',adminRegister);
authRouter.post('/login', adminLogin);
authRouter.get('/getAdminProfile',verifyAdminJWT, adminProfile)
authRouter.post('/logout', verifyAdminJWT, adminLogout);




export default authRouter;