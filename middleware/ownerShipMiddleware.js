const Project = require("../models/Project");

const ownershipMiddleware = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    if (project.lead.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only the project lead can perform this action",
      });
    }
    req.project = project;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = ownershipMiddleware;