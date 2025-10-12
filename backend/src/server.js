import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas de autenticación
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
