import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  toggleTaskState,
} from "../controllers/taskController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// CRUD de tareas
router.post("/:projectId", verifyToken, createTask);
router.get("/:projectId", verifyToken, getTasksByProject);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

// Alternar estado
router.put("/:id/toggle", verifyToken, toggleTaskState);

export default router;
