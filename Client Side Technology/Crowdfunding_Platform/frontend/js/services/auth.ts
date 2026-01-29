import { API_URL } from "../config/api.js";
import { AuthResponse } from "../types.js";


export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(API_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) {
    throw new Error("Login failed");
  }
  
  return res.json();
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(API_URL + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role: "user", isActive: true })
  });
  
  if (!res.ok) {
    throw new Error("Registration failed");
  }
  
  return res.json();
}
