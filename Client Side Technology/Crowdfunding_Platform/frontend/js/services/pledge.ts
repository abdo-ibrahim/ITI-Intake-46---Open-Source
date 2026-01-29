import { API_URL, getHeaders } from "../config/api.js";
import { Pledge } from "../types.js";

// Get all pledges (for admin)
export async function getAllPledges(): Promise<Pledge[]> {
  const res = await fetch(API_URL + "/pledges", {
    headers: getHeaders(),
  });
  return res.json();
}

// Get pledges for a campaign
export async function getCampaignPledges(campaignId: number): Promise<Pledge[]> {
  const res = await fetch(API_URL + "/pledges?campaignId=" + campaignId);
  return res.json();
}

// Get pledges by user
export async function getUserPledges(userId: number): Promise<Pledge[]> {
  const res = await fetch(API_URL + "/pledges?userId=" + userId, {
    headers: getHeaders(),
  });
  return res.json();
}

// Create a pledge
export async function createPledge(campaignId: number, userId: number, amount: number): Promise<Pledge> {
  const res = await fetch(API_URL + "/pledges", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      campaignId: campaignId,
      userId: userId,
      amount: amount,
    }),
  });
  return res.json();
}
