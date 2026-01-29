export const API_URL: string = "http://localhost:3000";

export function getHeaders(): { "Content-Type": string; Authorization?: string } {
  const token = localStorage.getItem("token");
  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  return headers;
}
