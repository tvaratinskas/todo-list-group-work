const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Sending registration request...");

  fetch("https://testapi.io/api/tomas1089/resource/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer your-auth-token-here", // if required
    },
    body: JSON.stringify({ login: username, password: password }),
  })
    .then((response) => {
      console.log("Received registration response:", response);

      if (response.ok) {
        alert("Registration successful");
        window.location.replace("login.html");
      } else {
        response
          .json()
          .then((data) => {
            console.log(data);
            alert("Registration failed: " + data.error); // display error message
          })
          .catch((error) => {
            console.error;
            alert("Registration failed");
          });
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while trying to register");
    });
});
