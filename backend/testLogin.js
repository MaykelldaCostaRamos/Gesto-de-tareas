const testLogin = async () => {
  const url = "http://127.0.0.1:4000/api/auth/login";

  const body = {
    email: "maykell@example.com",
    password: "123456"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
};

testLogin();
