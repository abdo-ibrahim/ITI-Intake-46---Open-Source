import { Campaign, User } from "../types.js";

import { getUserCampaigns, createCampaign } from "../services/campaign.js";
import "../components/header.js";
import { initModal } from "../components/modal.js";

const myCampaignsTableBody = document.getElementById("campaigns-table-body") as HTMLTableSectionElement;
const myCampaignsForm = document.querySelector("form") as HTMLFormElement;
const myCampaignsFileInput = document.getElementById("campaignImage") as HTMLInputElement;
const myCampaignsHiddenInput = document.getElementById("campaignImageBase64") as HTMLInputElement;

function getMyCampaignsUser(): User | null {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

const myCampaignsUser = getMyCampaignsUser();
if (!myCampaignsUser) {
  window.location.href = "login.html";
}

function renderMyCampaignsTable(campaigns: Campaign[]): void {
  if (!myCampaignsTableBody) return;
  
  myCampaignsTableBody.innerHTML = "";
  
  if (campaigns.length === 0) {
    myCampaignsTableBody.innerHTML = "<tr><td colspan='7'>You have no campaigns yet.</td></tr>";
    return;
  }
  
  campaigns.forEach(function(c: Campaign): void {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.title}</td>
      <td>${(c.description || "").substring(0, 50)}...</td>
      <td>$${c.goal}</td>
      <td class='status'>
        <button class='${c.isApproved ? "btn-success" : "btn-warning"}'>
          ${c.isApproved ? "Active" : "Pending"}
        </button>
      </td>
      <td class='date'>${c.deadline}</td>
      <td>
        <img src='${c.image || "./images/campaign.jpg"}' width='50' height='50' style='object-fit:cover;border-radius:4px;' />
      </td>
    `;
    myCampaignsTableBody.appendChild(row);
  });
}

async function loadMyCampaigns(): Promise<void> {
  if (!myCampaignsUser) return;
  
  try {
    const campaigns: Campaign[] = await getUserCampaigns(myCampaignsUser.id);
    renderMyCampaignsTable(campaigns);
  } catch (error) {
    console.log("Error loading campaigns:", error);
  }
}

if (myCampaignsFileInput) {
  myCampaignsFileInput.addEventListener("change", function(): void {
    const file = myCampaignsFileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e): void {
        myCampaignsHiddenInput.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  });
}

if (myCampaignsForm) {
  myCampaignsForm.addEventListener("submit", async function(e: Event): Promise<void> {
    e.preventDefault();
    
    if (!myCampaignsUser) return;
    
    const title = (document.getElementById("campaignName") as HTMLInputElement).value;
    const description = (document.getElementById("campaignDescription") as HTMLTextAreaElement).value;
    const goal = (document.getElementById("campaignGoal") as HTMLInputElement).value;
    const deadline = (document.getElementById("campaignDeadline") as HTMLInputElement).value;
    const image = myCampaignsHiddenInput.value;
    
    try {
      await createCampaign({
        title: title,
        description: description,
        goal: Number(goal),
        deadline: deadline,
        image: image,
        creatorId: myCampaignsUser.id,
        isApproved: false
      });
      
      alert("Campaign created successfully!");
      window.location.reload();
      
    } catch (error) {
      alert("Failed to create campaign.");
    }
  });
}

loadMyCampaigns();
initModal("myModal", "openModalBtn");
