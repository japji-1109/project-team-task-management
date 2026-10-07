# Project Team Task Management System

This is a backend project made using Node.js, Express.js, MongoDB and Mongoose.

The project is used to manage projects, team members and tasks. There are two roles in the system:

- Lead
- Member

A lead can create a project and assign tasks to team members. A member can update the status of the tasks assigned to them.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

## Project Structure

```text
project-team-task-management
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── ownerShipMiddleware.js
│
├── models
│   ├── Project.js
│   ├── Task.js
│   └── TeamMember.js
│
├── routes
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── db.js
├── server.js
├── .env
├── package.json
└── README.md
