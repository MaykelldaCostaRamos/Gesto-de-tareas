import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Crear un nuevo proyecto
router.post("/", verifyToken, createProject);

// Obtener todos los proyectos del usuario autenticado
router.get("/", verifyToken, getProjects);

// Actualizar un proyecto por ID
router.put("/:id", verifyToken, updateProject);

// Eliminar un proyecto por ID
router.delete("/:id", verifyToken, deleteProject);

export default router;
