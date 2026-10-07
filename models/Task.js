const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;