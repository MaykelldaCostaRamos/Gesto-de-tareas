import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Funciones de validación internas
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validatePassword = (password) => password.length >= 6;
const validateName = (name) => name && name.trim() !== "";

// Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones
    if (!validateName(name)) return res.status(400).json({ message: "Nombre inválido" });
    if (!validateEmail(email)) return res.status(400).json({ message: "Email inválido" });
    if (!validatePassword(password)) return res.status(400).json({ message: "Contraseña muy corta" });

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Usuario ya registrado" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Usuario registrado", userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Login usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Generar JWT
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener perfil
export const getProfile = async (req, res) => {
  try {
    // req.user viene del middleware verifyToken
    const { userId, name } = req.user;
    res.json({ userId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
