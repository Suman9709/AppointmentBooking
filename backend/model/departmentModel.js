import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

}, { timestamps: true });


departmentSchema.index({ name: 1 });
const Department = mongoose.model("Department", departmentSchema);

export default Department;