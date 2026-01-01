import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/adminRegister', adminRegister);
authRouter.post('/login', adminLogin);
authRouter.post('/logout', adminLogout);




export default authRouter;