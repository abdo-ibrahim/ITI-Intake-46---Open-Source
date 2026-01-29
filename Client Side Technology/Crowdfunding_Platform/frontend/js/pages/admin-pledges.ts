import { getAllPledges } from "../services/pledge.js";
import { getUserById } from "../services/user.js";
import { getCampaignById } from "../services/campaign.js";
import "../components/header.js";
import { Pledge } from "../types.js";

const adminPledgesTable = document.querySelector("tbody") as HTMLTableSectionElement;

async function renderAdminPledgesTable(pledges: Pledge[]): Promise<void> {
  if (!adminPledgesTable) return;

  adminPledgesTable.innerHTML = "";

  if (pledges.length === 0) {
    adminPledgesTable.innerHTML = `<tr><td colspan="4">No pledges yet.</td></tr>`;
    return;
  }

  const userMap: { [id: number]: string } = {};
  const campaignMap: { [id: number]: string } = {};

  await Promise.all(
    pledges.map(async (p) => {
      // User name
      if (!(p.userId in userMap)) {
        try {
          const userRes = await getUserById(p.userId);
          let user = userRes;
          if (Array.isArray(userRes)) user = userRes[0];
          userMap[p.userId] = user && user.name ? user.name : `User #${p.userId}`;
        } catch {
          userMap[p.userId] = `User #${p.userId}`;
        }
      }
      // Campaign title
      if (!(p.campaignId in campaignMap)) {
        try {
          const campRes = await getCampaignById(p.campaignId);
          let campaign = campRes;
          if (Array.isArray(campRes)) campaign = campRes[0];
          campaignMap[p.campaignId] = campaign && campaign.title ? campaign.title : `Campaign #${p.campaignId}`;
        } catch {
          campaignMap[p.campaignId] = `Campaign #${p.campaignId}`;
        }
      }
    }),
  );

  pledges.forEach(function (p: Pledge): void {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${campaignMap[p.campaignId]}</td>
      <td>${userMap[p.userId]}</td>
      <td>$${p.amount}</td>
    `;
    adminPledgesTable.appendChild(row);
  });
}

async function loadAdminPledges(): Promise<void> {
  try {
    const pledges: Pledge[] = await getAllPledges();
    await renderAdminPledgesTable(pledges);
  } catch (error) {
    console.log("Error:", error);
  }
}

loadAdminPledges();
