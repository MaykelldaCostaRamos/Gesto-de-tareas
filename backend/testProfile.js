// testProfile.js

const testProfile = async () => {
  // Aquí va el token que obtuviste en login
  const token = "PON_AQUI_EL_TOKEN_DEVUELTO_DEL_LOGIN";

  const url = "http://127.0.0.1:4000/api/auth/profile";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Token en header
      }
    });

    const data = await response.json();
    console.log("Perfil del usuario:", data);
  } catch (err) {
    console.error("Error:", err);
  }
};

testProfile();
