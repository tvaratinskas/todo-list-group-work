const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const email = document.getElementById("email").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log("Sending registration request...");

  fetch("https://testapi.io/api/tomas1089/resource/todoRegister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: username, password: password, email: email }),
  })
    .then((response) => {
      console.log("Received registration response:", response);

      if (response.ok) {
        alert("Registration successful");
        window.location.replace("login.html");
      } else {
        alert("Registration failed");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while trying to register");
    });
});
