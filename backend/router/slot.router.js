import express from "express";
import { createSlot, deleteSlotById, getAllSlots, getSlotById, updateSlotById } from "../controller/slot.controller.js";

const sloutRouter = express.Router();

sloutRouter.post("/create", createSlot);
sloutRouter.get("/allslots", getAllSlots);
sloutRouter.get("/:id", getSlotById);
sloutRouter.put("/update/:id", updateSlotById);
sloutRouter.delete("/delete/:id", deleteSlotById);

export default sloutRouter;