import {users} from 'users.js'
document.addEventListener("DOMContentLoaded", () => {

//   const users = [
//     { id: 1, name: "Admin", email: "admin@example.com", password: "12345" },
//     { id: 2, name: "Usuario 1", email: "usuario1@example.com", password: "12345"},
//     { id: 3, name: "Usuario 2", email: "usuario2@example.com", password: "12345"},
// ]

const form = document.getElementById('login-Form');
const InputEmail = document.getElementById('inputEmail');
const InputPassword = document.getElementById('inputPassword');
const message = document.getElementById('error-message')

InputEmail.addEventListener("input", () => {
  message.textContent = "";
});

InputPassword.addEventListener("input", () => {
  message.textContent = "";
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = InputEmail.value.trim();
    const password = InputPassword.value.trim();

    const user = users.find(userFound => userFound.email === email && userFound.password === password)

    if(!user) {
        message.textContent = "Credenciales incorrectas";
        return;
    }

    localStorage.setItem("Sesion-iniciada",JSON.stringify(user));
    window.location.href = "habits.html"
})
});

// ---------- WE PROTECT THE PAGE AND IT'S ROUTES ----------
const loginStarted = JSON.parse(localStorage.getItem("Sesion-iniciada"));

if (window.location.pathname.includes("habits.html")) {
  if (!loginStarted) {
    window.location.href = "index.html";
  } else {
    const welcomeText = document.getElementById("welcomeText");
    const logoutBtn = document.getElementById("logoutBtn");

    welcomeText.textContent = `Hello, ${loginStarted.name}`;

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("Sesion-iniciada");
      window.location.href = "index.html";
    });
  }
}
