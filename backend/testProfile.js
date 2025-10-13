const testProfile = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjMGFlNWEwNjgwZDY3ZTEwNTAxODciLCJuYW1lIjoiTWF5a2VsbCIsImlhdCI6MTc2MDM0NjMwMiwiZXhwIjoxNzYwNDMyNzAyfQ.jTi0Q6gjAaW7m8-Ot7ryU3dm2B3FFJCOXQnhBZBUAzU";
  const url = "http://127.0.0.1:4000/api/auth/profile";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    // Verificar status antes de parsear JSON
    if (!response.ok) {
      const text = await response.text(); // si no es JSON, imprime el texto
      console.error(`Error ${response.status}:`, text);
      return;
    }

    const data = await response.json();
    console.log("Perfil del usuario:", data);

  } catch (err) {
    console.error("Error en la petición:", err);
  }
};

testProfile();
