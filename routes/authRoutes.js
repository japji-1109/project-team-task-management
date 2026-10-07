const TeamMember = require("../models/TeamMember");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingEmail = await TeamMember.findOne({ email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "The email is already registered!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const teamMember = new TeamMember({
      name,
      email,
      password: hashPassword,
      role,
    });

    await teamMember.save();

    res.status(201).json({
      message: "TeamMember registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const teamMember = await TeamMember.findOne({ email });

    if (!teamMember) {
      return res.status(404).json({
        message: "TeamMember not found.",
      });
    }
    const check = await bcrypt.compare(password, teamMember.password);
    if (!check) {
      return res.status(401).json({
        message: "Password is invalid.",
      });
    }
    const token = jwt.sign({ id: teamMember._id, role: teamMember.role }, process.env.JWT_SECRET);
    res.status(200).json({
        message: "Logged in successfully.",
        token: token
    })
  } catch (error) {
    res.status(500).json({
        message: error.message
    })
  }
});

// router.get("/test", authMiddleware, (req, res) => {
//     res.json({
//         message: "Authentication successful",
//         user: req.user
//     });
// });

module.exports = router;
