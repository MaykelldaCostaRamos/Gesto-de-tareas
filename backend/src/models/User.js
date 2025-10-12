import mongoose from "mongoose";

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // obligatorio
    trim: true        // elimina espacios al inicio y final
  },
  email: {
    type: String,
    required: true,
    unique: true,     // cada email debe ser único en la colección
    lowercase: true   // convierte a minúsculas automáticamente
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // agrega createdAt y updatedAt automáticamente

// Crear modelo a partir del esquema
const User = mongoose.model("User", userSchema);

export default User;

