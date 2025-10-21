import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// ==========================
// Conectar a MongoDB
// ==========================
connectDB();

// ==========================
// Middlewares
// ==========================
app.use(cors({
  origin: process.env.VITE_API_URL || "*", // cambiar "*" en producción
  credentials: true
}));
app.use(express.json());      // Para recibir JSON
app.use(cookieParser());      // Para manejar cookies

// ==========================
// Rutas
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

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
