import api from "./axios"; // tu instancia de Axios ya configurada con withCredentials

export const registerUser = async (data) => {
  // El backend creará la cookie automáticamente
  const response = await api.post("/auth/register", data);
  return response.data; // solo info de éxito, no token
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data; // el token está en cookie, no lo manejamos aquí
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data; // backend borrará la cookie
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile"); 
  return response.data; // backend lee la cookie y devuelve info del usuario
};
