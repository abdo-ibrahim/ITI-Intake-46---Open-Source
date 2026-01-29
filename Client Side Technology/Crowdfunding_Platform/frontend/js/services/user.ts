import { API_URL, getHeaders } from "../config/api.js";
import { User } from "../types.js";

// Get all users (for admin)
export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_URL + "/users", {
    headers: getHeaders(),
  });
  return res.json();
}

// Get user by ID
export async function getUserById(id: number): Promise<User> {
  const res = await fetch(API_URL + "/users/" + id, {
    headers: getHeaders(),
  });
  return res.json();
}

// Ban user
export async function banUser(id: number): Promise<User> {
  const res = await fetch(API_URL + "/users/" + id, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ isActive: false }),
  });
  return res.json();
}

// Activate user
export async function activateUser(id: number): Promise<User> {
  const res = await fetch(API_URL + "/users/" + id, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ isActive: true }),
  });
  return res.json();
}
