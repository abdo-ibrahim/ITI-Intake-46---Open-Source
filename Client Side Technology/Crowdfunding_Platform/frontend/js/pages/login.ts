import { AuthResponse } from "../types.js";

import { login } from "../services/auth.js";
import "../components/header.js";

const loginForm = document.querySelector("form") as HTMLFormElement;

loginForm.addEventListener("submit", async function (e: Event): Promise<void> {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  const btn = loginForm.querySelector("button[type='submit']") as HTMLButtonElement;

  try {
    btn.disabled = true;
    btn.textContent = "Logging in...";

    const data: AuthResponse = await login(email, password);

    // Check if user is active
    if (!data.user.isActive) {
      alert("Your account has been deactivated. Please contact support.");
      btn.disabled = false;
      btn.textContent = "Login";
      return;
    }

    console.log("Login successful:", data);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } catch (error) {
    alert("Login failed. Please check your credentials.");
    btn.disabled = false;
    btn.textContent = "Login";
  }
});
