import { User, Campaign, Pledge } from "../types.js";

import { getUsers } from "../services/user.js";
import { getAllCampaigns } from "../services/campaign.js";
import { getAllPledges } from "../services/pledge.js";
import "../components/header.js";

import { adminGuard } from "../utils/protect.js";
adminGuard();

const statUsers = document.querySelector(".stat-card:nth-child(1) .stat-number") as HTMLElement;
const statCampaigns = document.querySelector(".stat-card:nth-child(2) .stat-number") as HTMLElement;
const statPledges = document.querySelector(".stat-card:nth-child(3) .stat-number") as HTMLElement;

async function loadStats(): Promise<void> {
  try {
    const users: User[] = await getUsers();
    const campaigns: Campaign[] = await getAllCampaigns();
    const pledges: Pledge[] = await getAllPledges();

    if (statUsers) statUsers.textContent = String(users.length);
    if (statCampaigns) statCampaigns.textContent = String(campaigns.length);
    if (statPledges) statPledges.textContent = String(pledges.length);
  } catch (error) {
    console.log("Error loading stats:", error);
  }
}

loadStats();
