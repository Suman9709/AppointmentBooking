import express from "express";
import { createSlot, deleteSlotById, getAllSlots, getSlotByDepartment, getSlotById, updateSlotById } from "../controller/slot.controller.js";
import { verifyAdminJWT, verifyDoctorJWT } from "../middleware/middleware.js";
// import { verifyDoctorJWT, verifyJWT } from "../middleware/middleware.js";

const sloutRouter = express.Router();

sloutRouter.post("/create", verifyDoctorJWT, createSlot);
sloutRouter.get("/allslots", verifyDoctorJWT, getAllSlots);
sloutRouter.get("/:id", verifyDoctorJWT, getSlotById);
sloutRouter.put("/update/:id", verifyDoctorJWT, updateSlotById);
sloutRouter.delete("/delete/:id", verifyDoctorJWT, deleteSlotById);
sloutRouter.get("/slotbydepartment/:departmentId", getSlotByDepartment);


export default sloutRouter;