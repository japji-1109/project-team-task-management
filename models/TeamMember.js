const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        required: true
    }, 

    role: {
        type: String,
        required: true,
        enum: ["lead", "member"]
    }
})

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;