import { API_URL, getHeaders } from "../config/api.js";
import { Campaign } from "../types.js";

// Get approved campaigns (for home page)
export async function getApprovedCampaigns(): Promise<Campaign[]> {
  const res = await fetch(API_URL + "/campaigns?isApproved=true");
  return res.json();
}

// Get all campaigns (for admin)
export async function getAllCampaigns(): Promise<Campaign[]> {
  const res = await fetch(API_URL + "/campaigns", {
    headers: getHeaders(),
  });
  return res.json();
}

// Get campaigns by user ID
export async function getUserCampaigns(id: number): Promise<Campaign[]> {
  const res = await fetch(API_URL + "/campaigns?creatorId=" + id, {
    headers: getHeaders(),
  });
  return res.json();
}

// Get single campaign by ID
export async function getCampaignById(id: number): Promise<Campaign> {
  const res = await fetch(API_URL + "/campaigns/" + id);

  if (!res.ok) {
    throw new Error("Campaign not found");
  }

  return res.json();
}

// Create new campaign
export async function createCampaign(data: Partial<Campaign>): Promise<Campaign> {
  const res = await fetch(API_URL + "/campaigns", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update campaign
export async function updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign> {
  const res = await fetch(API_URL + "/campaigns/" + id, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete campaign
export async function deleteCampaign(id: number): Promise<void> {
  await fetch(API_URL + "/campaigns/" + id, {
    method: "DELETE",
    headers: getHeaders(),
  });
}

// Approve campaign
export async function approveCampaign(id: number): Promise<Campaign> {
  return updateCampaign(id, { isApproved: true });
}

// Reject campaign
export async function rejectCampaign(id: number): Promise<Campaign> {
  return updateCampaign(id, { isApproved: false });
}

// Search campaigns
export async function searchCampaigns(query: string): Promise<Campaign[]> {
  const res = await fetch(API_URL + "/campaigns?isApproved=true&q=" + query);
  return res.json();
}
