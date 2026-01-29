import { User } from "../types.js";

import { getUsers, banUser, activateUser } from "../services/user.js";
import "../components/header.js";

const adminUsersTable = document.querySelector("tbody") as HTMLTableSectionElement;

function renderAdminUsersTable(users: User[]): void {
  if (!adminUsersTable) return;

  adminUsersTable.innerHTML = "";

  users.forEach(function (u: User): void {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role || "user"}</td>
      <td class='status'>
        <button class='${u.isActive !== false ? "btn-success" : "btn-danger"}'>
          ${u.isActive !== false ? "Active" : "Banned"}
        </button>
      </td>
      <td>
        <button class='${u.isActive !== false ? "btn-danger" : "btn-success"} toggle-btn'
          data-id='${u.id}' data-active='${u.isActive !== false}'>
          ${u.isActive !== false ? "Ban" : "Activate"}
        </button>
      </td>
    `;
    adminUsersTable.appendChild(row);
  });

  document.querySelectorAll(".toggle-btn").forEach(function (btn): void {
    btn.addEventListener("click", async function (): Promise<void> {
      const el = btn as HTMLElement;
      const id = Number(el.getAttribute("data-id"));
      const isActive = el.getAttribute("data-active") === "true";

      if (isActive) {
        const user = (await getUsers()).find((u) => u.id === id);
        if (user && user.role === "admin") {
          alert("Cannot ban an admin user.");
          return;
        }
        await banUser(id);
      } else {
        await activateUser(id);
      }

      loadAdminUsers();
    });
  });
}

async function loadAdminUsers(): Promise<void> {
  try {
    const users: User[] = await getUsers();
    renderAdminUsersTable(users);
  } catch (error) {
    console.log("Error:", error);
  }
}

loadAdminUsers();
