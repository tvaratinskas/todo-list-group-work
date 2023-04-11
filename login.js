const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Sending login request...");

    try {
      const response = await fetch(
        "https://testapi.io/api/tomas1089/resource/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: username, password: password }),
        }
      );

      console.log("Received login response:", response);

      if (response.ok) {
        alert("Login successful");

        // Store login credentials in session storage
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);

        // Redirect to index.html
        window.location.href = "index.html";
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while trying to login");
    }
  });
}
