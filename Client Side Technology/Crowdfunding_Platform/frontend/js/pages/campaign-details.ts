import { Campaign, Pledge } from "../types.js";

import { getCampaignById } from "../services/campaign.js";
import { getCampaignPledges, createPledge } from "../services/pledge.js";
import { getUserById } from "../services/user.js";
import "../components/header.js";
import { getUser } from "../utils/storage.js";

const detailsUrlParams = new URLSearchParams(window.location.search);
const detailsCampaignId = Number(detailsUrlParams.get("id"));
const detailsCard = document.querySelector(".campaign-details-card") as HTMLElement;
const detailsTableContainer = document.querySelector(".pledge-table-container") as HTMLElement;

async function loadCampaignDetails(): Promise<void> {
  if (!detailsCampaignId) {
    alert("No campaign ID");
    window.location.href = "index.html";
    return;
  }
  try {
    const campaign: Campaign = await getCampaignById(detailsCampaignId);
    const pledges: Pledge[] = await getCampaignPledges(detailsCampaignId);
    let totalRaised = 0;
    pledges.forEach((p) => (totalRaised += p.amount));
    const percentage = Math.min((totalRaised / campaign.goal) * 100, 100);

    const pledgesHtml = await renderDetailsPledges(pledges);
    if (detailsCard) {
      detailsCard.innerHTML = `
          <div class="cd-header">
            <img src="${campaign.image || "../../images/campaign.jpg"}" alt="Campaign Image" class="cd-img" />
            <div class="cd-info">
              <h1 class="cd-title">${campaign.title}</h1>
              <p class="cd-desc">${campaign.description || "No description."}</p>
              <div class="cd-meta">
                <span class="cd-meta-item cd-goal">
                  <span class="cd-meta-label">Goal</span>
                  <span class="cd-meta-value">$${campaign.goal}</span>
                </span>
                <span class="cd-meta-item cd-deadline">
                  <span class="cd-meta-label">Deadline</span>
                  <span class="cd-meta-value">${campaign.deadline}</span>
                </span>
              </div>
              <div class="cd-progress">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="progress-bar-label">$${totalRaised} raised</span>
              </div>
            </div>
          </div>
      `;
    }

    detailsTableContainer.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Supporter</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${pledgesHtml}
            </tbody>
          </table>
      `;

    const detailsDonateBtn = document.getElementById("donate-btn") as HTMLButtonElement;
    const detailsAmountInput = document.getElementById("donate-amount") as HTMLInputElement;

    if (detailsDonateBtn) {
      detailsDonateBtn.addEventListener("click", async function (): Promise<void> {
        const amount = Number(detailsAmountInput.value);

        if (!amount || amount <= 0) {
          alert("Please enter a valid amount");
          return;
        }

        const user = getUser();
        if (!user) {
          alert("Please login to pledge");
          window.location.href = "login.html";
          return;
        }

        try {
          await createPledge(detailsCampaignId, user.id, amount);
          alert("Thank you for your pledge!");
          loadCampaignDetails();
        } catch (error) {
          alert("Failed to pledge");
        }
      });
    }
  } catch (error) {
    console.log("Error:", error);
    alert("Failed to load campaign");
  }
}

async function renderDetailsPledges(pledges: Pledge[]): Promise<string> {
  if (pledges.length === 0) {
    return "<tr><td colspan='2'>No pledges yet. Be the first!</td></tr>";
  }
  // sum amounts per user
  const userTotals: { [userId: number]: number } = {};
  for (const p of pledges) {
    if (!userTotals[p.userId]) {
      userTotals[p.userId] = 0;
    }
    userTotals[p.userId] += p.amount;
  }

  const uniqueUserIds = Object.keys(userTotals).map(Number);

  const rows = await Promise.all(
    uniqueUserIds.map(async (userId) => {
      try {
        const user = await getUserById(userId);
        if (user && user.name) {
          return `<tr><td>${user.name}</td><td>$${userTotals[userId]}</td></tr>`;
        } else {
          return `<tr><td>User #${userId}</td><td>$${userTotals[userId]}</td></tr>`;
        }
      } catch {
        return `<tr><td>User #${userId}</td><td>$${userTotals[userId]}</td></tr>`;
      }
    }),
  );
  return rows.join("");
}

loadCampaignDetails();
