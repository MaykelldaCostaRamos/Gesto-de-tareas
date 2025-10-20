import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors({ // Permite peticiones desde el frontend
  origin: "http://localhost:5173",
  credentials: true
})); 
app.use(express.json()); // Para leer JSON en las solicitudes


// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de proyectos
app.use("/api/project", projectRoutes);

// Rutas de tareas
app.use("/api/task", taskRoutes);

// Puerto dinámico o 4000 por defecto
const PORT = process.env.PORT || 4000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
