// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const patientSchema = new mongoose.Schema({
//     patientName: {
//         type: String,
//         required: true
//     },
//     patientEmail: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     gender: {
//         type: String,
//         enum: ["Male", "Female", "Other"],
//     },
//     patientPassword: {
//         type: String,
//         required: true
//     },
//     patientContact: {
//         type: String,
//         required: true
//     },
//     patientAge: {
//         type: Number,
//         required: true
//     },
//     address: {
//         type: String,
//     },
//     patientParentsName: {
//         type: String,
//     }
// }, { timestamps: true });


// patientSchema.pre("save", async function () {
//     if (!this.isModified("patientPassword")) {
//         return;
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.patientPassword = await bcrypt.hash(this.patientPassword, salt);
// })


// patientSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.patientPassword);
// }

// // patientSchema.methods.generateJWTToken = function () {
// //     return jwt.sign(
// //         {
// //             patientId: this._id,
// //             patientName: this.patientName,
// //             patientEmail: this.patientEmail,

// //         },
// //         process.env.JWT_SECRET,
// //         { expiresIn: "7d" }
// //     );
// // };



// patientSchema.methods.generateJWTToken = function () {
//     return jwt.sign(
//         {
//             userId: this._id,
//             role: "PATIENT",
//             patientName: this.patientName,
//             patientEmail: this.patientEmail,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//     );
// };
// const Patient = mongoose.model("Patient", patientSchema);
// export default Patient;




import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    contact: {
        type: String,
        required: true,
    },

    address: {
        type: String,
    },

    parentName: {
        type: String,
    },

}, { timestamps: true });


// INDEX

patientSchema.index({ userId: 1 });

const Patient = mongoose.model(
    "Patient",
    patientSchema
);

export default Patient;