const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Sending login request...");

  fetch("https://testapi.io/api/tomas1089/resource/todoLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: username, password: password }),
  })
    .then((response) => {
      console.log("Received login response:", response);

      if (response.ok) {
        alert("Login successful");
        window.location.replace("index.html");
      } else {
        alert("Login failed");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while trying to login");
    });
});
