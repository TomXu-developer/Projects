const { Router } = require("express");
const taskRoutes = require("./tasks.router");

const routes = Router();
routes.use("/tasks", taskRoutes);

module.exports = routes;
