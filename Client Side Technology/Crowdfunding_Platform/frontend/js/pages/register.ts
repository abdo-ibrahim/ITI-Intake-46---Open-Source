import { AuthResponse } from "../types.js";

import { register } from "../services/auth.js";
import "../components/header.js";

const registerForm = document.querySelector("form") as HTMLFormElement;

registerForm.addEventListener("submit", async function(e: Event): Promise<void> {
  e.preventDefault();
  
  const name = (document.getElementById("fullName") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
  const btn = registerForm.querySelector("button[type='submit']") as HTMLButtonElement;
  
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  
  try {
    btn.disabled = true;
    btn.textContent = "Creating Account...";
    
    const data: AuthResponse = await register(name, email, password);
    

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    window.location.href = "index.html";
    
  } catch (error) {
    alert("Registration failed. Please try again.");
    btn.disabled = false;
    btn.textContent = "Create Account";
  }
});
