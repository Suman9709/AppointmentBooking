import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
        select: false,
    },

    role: {
        type: String,
        enum: ["ADMIN", "DOCTOR", "PATIENT"],
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

// Password hashes must never leave the API, including create/register responses.
userSchema.set("toJSON", {
    transform: (_document, value) => {
        delete value.password;
        return value;
    }
});


// HASH PASSWORD

userSchema.pre("save", async function () {
    // Async Mongoose middleware resolves by returning; mixing it with the old
    // next callback causes "next is not a function" in Mongoose 9.
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// COMPARE PASSWORD

userSchema.methods.comparePassword =
    async function (enteredPassword) {

        return await bcrypt.compare(
            enteredPassword,
            this.password
        );
    };


// GENERATE JWT

userSchema.methods.generateJWTToken =
    function () {

        return jwt.sign(
            {
                userId: this._id,
                role: this.role,
                email: this.email,
            },

            process.env.JWT_SECRET,

            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "7d",
            }
        );
    };

const User = mongoose.model("User", userSchema);

export default User;
