import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Validaciones internas
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validatePassword = (password) => password.length >= 6;
const validateName = (name) => name && name.trim() !== "";

// ===== REGISTRO =====
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateName(name) || !validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ message: "Datos inválidos o incompletos" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error en registerUser:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ===== LOGIN =====
// ===== LOGIN =====
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 🔒 Configuración para Render
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      path: "/",
    });

    // ✅ También devolvemos el token en el cuerpo
    res.json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// ===== LOGOUT =====
export const logoutUser = (req, res) => {
  // Limpia cookie correctamente también en producción
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path:"/"
  });
  res.json({ message: "Logout exitoso" });
};

// ===== PERFIL =====
export const getProfile = async (req, res) => {
  try {
    const { userId, name } = req.user;
    res.json({ userId, name });
  } catch (error) {
    console.error("Error en getProfile:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
