import express from "express";
import { adminLogin, adminLogout, adminProfile, adminRegister } from "../controller/auth.controller.js";
import { isAdmin, verifyJWT } from "../middleware/middleware.js";

const authRouter = express.Router();

authRouter.post('/adminRegister', adminRegister);
authRouter.post('/login', adminLogin);
authRouter.get('/getAdminProfile',verifyJWT,isAdmin, adminProfile)
authRouter.post('/logout', adminLogout);




export default authRouter;