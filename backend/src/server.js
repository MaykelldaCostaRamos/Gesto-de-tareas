// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// ==========================
// Configurar entorno y paths
// ==========================
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ==========================
// Conectar a MongoDB
// ==========================
connectDB();

// ==========================
// Middlewares
// ==========================
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://gestor-de-tareas-frontend.onrender.com" // URL real del frontend
    : "http://localhost:5173", // Vite dev server en local
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ==========================
// Rutas API
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

// ==========================
// Servir frontend en producción
if (process.env.NODE_ENV === "production") {
  // Servir todos los archivos estáticos de React (dist dentro del backend)
  app.use("/app", express.static(path.join(__dirname, "dist")));
}


// ==========================
// Ruta por defecto
// ==========================
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// ==========================
// Manejo de errores
// ==========================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error del servidor"
  });
});

// ==========================
// Iniciar servidor
// ==========================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
