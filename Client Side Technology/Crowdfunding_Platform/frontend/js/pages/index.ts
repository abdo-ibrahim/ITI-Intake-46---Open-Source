import { getCampaignPledges } from "../services/pledge.js";
import { getApprovedCampaigns, searchCampaigns } from "../services/campaign.js";
import { Campaign } from "../types.js";
import { getUser } from "../utils/storage.js";
import "../components/header.js";

const homeGrid = document.querySelector(".grid-campaigns") as HTMLElement;
const homeSearchForm = document.querySelector(".search-form") as HTMLFormElement;
const homeSearchInput = homeSearchForm ? (homeSearchForm.querySelector("input") as HTMLInputElement) : null;

const createYourCampaignButton = document.querySelector(".create-your-campaign") as HTMLElement;
createYourCampaignButton.addEventListener("click", function () {
  const user = getUser();
  if (user) {
    window.location.href = "campaigns.html";
  } else {
    window.location.href = "login.html";
  }
});

interface CampaignWithProgress extends Campaign {
  totalRaised: number;
  percentage: number;
}

function renderHomeCampaigns(campaigns: CampaignWithProgress[]): void {
  if (!homeGrid) return;

  homeGrid.innerHTML = "";

  if (campaigns.length === 0) {
    homeGrid.innerHTML = '<p style="text-align: center;">No campaigns found.</p>';
    return;
  }

  campaigns.forEach(function (campaign: CampaignWithProgress): void {
    const card = document.createElement("div");
    card.className = "campaign-card";

    card.innerHTML = `
      <img src="${campaign.image || "./images/campaign.jpg"}" alt="${campaign.title}" />
      <h3>${campaign.title}</h3>
      <p>${campaign.description || "No description."}</p>
      <div class="campaign-details">
        <span class="deadline">${campaign.deadline}</span>
        <span class="goal">$${campaign.goal}</span>
      </div>
      <div class="campaign-progress-bar">
        <div class="progress" style="width: ${campaign.percentage}%"></div>
        <span class="progress-text">
          ${Math.round(campaign.percentage)}% funded ($${campaign.totalRaised})
        </span>
      </div>
      <button onclick="window.location.href='campaign-details.html?id=${campaign.id}'">View Campaign</button>
    `;

    homeGrid.appendChild(card);
  });
}

async function campaignsWithProgress(campaigns: Campaign[]): Promise<CampaignWithProgress[]> {
  return Promise.all(
    campaigns.map(async (c) => {
      const pledges = await getCampaignPledges(c.id);
      let totalRaised = 0;
      pledges.forEach((p) => (totalRaised += p.amount));
      const percentage = Math.min((totalRaised / c.goal) * 100, 100);

      return {
        ...c,
        totalRaised,
        percentage,
      };
    }),
  );
}

async function loadHomeCampaigns(): Promise<void> {
  try {
    const campaigns: Campaign[] = await getApprovedCampaigns();
    const campaignsProgress = await campaignsWithProgress(campaigns);

    console.log("campaigns", campaignsProgress);
    renderHomeCampaigns(campaignsProgress);
  } catch (error) {
    console.log("Error loading campaigns:", error);
    if (homeGrid) {
      homeGrid.innerHTML = "<p>Error loading campaigns.</p>";
    }
  }
}

if (homeSearchForm) {
  homeSearchForm.addEventListener("submit", async function (e: Event): Promise<void> {
    e.preventDefault();
    const query = homeSearchInput?.value || "";

    if (query) {
      const campaigns: Campaign[] = await searchCampaigns(query);
      const campaignsProgress = await campaignsWithProgress(campaigns);
      renderHomeCampaigns(campaignsProgress);
    } else {
      loadHomeCampaigns();
    }
  });
}

loadHomeCampaigns();
