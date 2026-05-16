import Department from "../model/departmentModel.js";

export const createDepartment = async (req, res) => {

    try {

        // ================= ONLY ADMIN =================

        if (req.user.role !== "ADMIN") {

            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        // ================= BODY =================

        const { name } = req.body;

        // ================= VALIDATION =================

        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Department name is required"
            });
        }

        // ================= CHECK EXISTING =================

        const existingDepartment =
            await Department.findOne({
                name: name.toLowerCase()
            });

        if (existingDepartment) {

            return res.status(400).json({
                success: false,
                message: "Department already exists"
            });
        }

        // ================= CREATE =================

        const department =
            await Department.create({
                name
            });

        return res.status(201).json({

            success: true,

            message:
                "Department created successfully",

            department

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });
    }
};

export const getAllDepartments = async (req, res) => {

    try {

        const departments =await Department.find().sort({ name: 1 });

        return res.status(200).json({

            success: true,

            departments

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });
    }
};