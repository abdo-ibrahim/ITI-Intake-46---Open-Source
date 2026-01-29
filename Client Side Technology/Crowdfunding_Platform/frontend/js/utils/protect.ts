import { getUser } from "./storage.js";

export function adminGuard() {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html";
  }
  if (user.role !== "admin") {
    window.location.href = "index.html";
  }
}
export function authGuard() {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html";
  }
}
