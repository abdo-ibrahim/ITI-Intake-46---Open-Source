import { Campaign } from "../types.js";

import { getAllCampaigns, approveCampaign, rejectCampaign, deleteCampaign } from "../services/campaign.js";
import "../components/header.js";
import { getUserById } from "../services/user.js";

const adminCampaignsTable = document.querySelector("tbody") as HTMLTableSectionElement;

async function renderAdminCampaignsTable(campaigns: Campaign[]): Promise<void> {
  if (!adminCampaignsTable) return;

  adminCampaignsTable.innerHTML = "";

  // map user names
  const userMap: { [id: number]: string } = {};

  for (const c of campaigns) {
    if (!(c.creatorId in userMap)) {
      try {
        const userRes = await getUserById(c.creatorId);
        let user = userRes;
        if (Array.isArray(userRes)) user = userRes[0];
        userMap[c.creatorId] = user && user.name ? user.name : `User #${c.creatorId}`;
      } catch {
        userMap[c.creatorId] = `User #${c.creatorId}`;
      }
    }
  }

  campaigns.forEach(function (c: Campaign): void {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.title}</td>
      <td>${c.description || ""}...</td>
      <td>$${c.goal}</td>
      <td>${c.deadline}</td>
      <td>${userMap[c.creatorId]}</td>
      <td class='status'>
        <button class='${c.isApproved ? "btn-success" : "btn-danger"}'>
          ${c.isApproved ? "Approved" : "Rejected"}
        </button>
      </td>
      <td>
        <div style='display:flex;gap:8px;'>
          ${
            c.isApproved === null || typeof c.isApproved === "undefined"
              ? `<button class='btn-success approve-btn' data-id='${c.id}'>Approve</button>
                 <button class='btn-warning reject-btn' data-id='${c.id}'>Reject</button>`
              : c.isApproved === true
                ? `<button class='btn-warning reject-btn' data-id='${c.id}'>Reject</button>`
                : `<button class='btn-success approve-btn' data-id='${c.id}'>Approve</button>`
          }
          <button class='btn-danger delete-btn' data-id='${c.id}'>Delete</button>
        </div>
      </td>
    `;
    adminCampaignsTable.appendChild(row);
  });
  document.querySelectorAll(".approve-btn").forEach(function (btn): void {
    btn.addEventListener("click", async function (): Promise<void> {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));
      await approveCampaign(id);
      loadAdminCampaigns();
    });
  });

  document.querySelectorAll(".reject-btn").forEach(function (btn): void {
    btn.addEventListener("click", async function (): Promise<void> {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));
      if (confirm("Reject this campaign?")) {
        await rejectCampaign(id);
        loadAdminCampaigns();
      }
    });
  });

  document.querySelectorAll(".delete-btn").forEach(function (btn): void {
    btn.addEventListener("click", async function (): Promise<void> {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));
      if (confirm("Delete this campaign?")) {
        await deleteCampaign(id);
        loadAdminCampaigns();
      }
    });
  });
}

async function loadAdminCampaigns(): Promise<void> {
  try {
    const campaigns: Campaign[] = await getAllCampaigns();
    renderAdminCampaignsTable(campaigns);
  } catch (error) {
    console.log("Error:", error);
  }
}

loadAdminCampaigns();
