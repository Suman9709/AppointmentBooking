import express from "express";

import {
    createDepartment,
    getAllDepartments
} from "../controller/department.controller.js";
import { verifyAdminJWT } from "../middleware/middleware.js";

const departmentRouter = express.Router();

// CREATE DEPARTMENT

departmentRouter.post(
    "/createDepartment",verifyAdminJWT,
    createDepartment
);

// GET ALL DEPARTMENTS

departmentRouter.get(
    "/getalldepartments",
    getAllDepartments
);

export default departmentRouter;