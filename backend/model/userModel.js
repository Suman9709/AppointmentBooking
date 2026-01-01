import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'DOCTOR', 'PATIENT'],
        default: 'PATIENT'
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });



userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return ;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.generateJWTToken = function () {
    return jwt.sign(
        {
            userId: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )
}
const User = mongoose.model("User", userSchema);

export default User;