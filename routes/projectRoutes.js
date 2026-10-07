const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", authMiddleware, roleMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;

        const project = new Project({
            name,
            description,
            lead: req.user.id
        });

        await project.save();

        res.status(201).json({
            message: "Project created successfully",
            project: project
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;