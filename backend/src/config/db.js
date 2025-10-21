
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {

    });
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1); // Detiene el servidor si no se puede conectar
  }
};

export default connectDB;
