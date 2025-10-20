// backend/middleware/verifyToken.js
import jwt from "jsonwebtoken";

// Middleware para verificar JWT desde la cookie "token"
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // Leer token desde cookie

  if (!token) {
    return res.status(401).json({ message: "Token faltante" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega info del usuario a req
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
