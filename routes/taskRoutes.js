const express = require("express");
const Task = require("../models/Task");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const ownerShipMiddleware = require("../middleware/ownerShipMiddleware");
const router = express.Router();

router.get("/projects/:id/summary", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    const summary = await Task.aggregate([
      {
        $match: {
          project: project._id,
        },
      },

      {
        $group: {
          _id: "$assignedTo",

          totalTasks: {
            $sum: 1,
          },

          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },

          pendingTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
        },
      },

      {
        $lookup: {
          from: "teammembers",
          localField: "_id",
          foreignField: "_id",
          as: "member",
        },
      },

      {
        $unwind: "$member",
      },

      {
        $project: {
          _id: 0,
          memberName: "$member.name",
          email: "$member.email",
          totalTasks: 1,
          completedTasks: 1,
          pendingTasks: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Task summary",
      summary: summary,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/tasks/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your assigned task",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post(
  "/projects/:id/tasks",
  authMiddleware,
  roleMiddleware,
  ownerShipMiddleware,
  async (req, res) => {
    try {
      const { title, description, assignedTo } = req.body;
      const task = new Task({
        title,
        description,
        project: req.project._id,
        assignedTo: assignedTo,
      });

      await task.save();

      res.status(201).json({
        message: "Task created successfully",
        task: task,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

module.exports = router;
