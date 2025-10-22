import axios from "axios";

const api = axios.create({
  baseURL: "https://gestor-de-tareas-frontend.onrender.com", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
