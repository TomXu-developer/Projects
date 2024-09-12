const { Router } = require("express");
const {
  getAllTasks,
  getTaskById,
  updateTaskById,
  createTask,
  deleteTaskById,
} = require("../controller/tasks.controller");
const taskRoutes = Router();

taskRoutes.get("/", getAllTasks);
taskRoutes.get("/:id", getTaskById);
taskRoutes.post("/", createTask);
taskRoutes.delete("/:id", deleteTaskById);
taskRoutes.put("/:id", updateTaskById);

module.exports = taskRoutes;
