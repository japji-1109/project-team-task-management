const express = require("express");
require("dotenv").config();
const connectDB = require("./db");
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
app.use(express.json());

connectDB();
app.use("/auth", authRoutes);
app.use('/projects', projectRoutes)
app.use('/', taskRoutes)
app.get("/", (req, res) => {
    res.send("Project Team Task Management API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});