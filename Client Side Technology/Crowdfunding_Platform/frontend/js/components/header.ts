import { getUser } from "../utils/storage.js";

const menu = document.querySelector("header .menu") as HTMLButtonElement;
const nav = document.querySelector("header nav") as HTMLElement;

if (menu && nav) {
  menu.addEventListener("click", (): void => {
    nav.classList.toggle("active");
  });
}

export function updateHeader(): void {
  const controls = document.querySelector("header .controls") as HTMLElement;
  const dashboardLink = document.querySelector("header nav .dashboard-link") as HTMLElement;
  const campaignsLink = document.querySelector("header nav .campaigns-link") as HTMLElement;
  const user = getUser();

  if (dashboardLink) dashboardLink.style.display = "none";
  if (campaignsLink) campaignsLink.style.display = "none";

  if (user) {
    if (campaignsLink) campaignsLink.style.display = "block";
    if (dashboardLink && user.role === "admin") dashboardLink.style.display = "block";
    if (controls) {
      controls.innerHTML = `<span style="margin-right:10px;font-weight:500;">Hello, ${user.name}</span>` + ' <a href="#"><button id="logoutBtn" class="btn-outline">Logout</button></a>';

      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (): void => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "index.html";
        });
      }
    }
  } else {
    // not logged in
    if (controls) {
      controls.innerHTML = `
        <a href="login.html">
          <button>Login</button>
        </a>
        <a href="register.html">
          <button class="btn-outline">Sign Up</button>
        </a>
      `;
    }
  }
}

updateHeader();
