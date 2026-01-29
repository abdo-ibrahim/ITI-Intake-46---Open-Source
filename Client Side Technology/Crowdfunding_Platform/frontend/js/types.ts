export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  isActive: boolean;
};

export type Campaign = {
  id: number;
  title: string;
  description?: string;
  goal: number;
  deadline: string;
  image?: string;
  creatorId: number;
  isApproved: boolean;
};

export type Pledge = {
  id: number;
  campaignId: number;
  userId: number;
  amount: number;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
