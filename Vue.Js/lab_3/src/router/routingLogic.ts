import type { RouteLocationNormalized } from "vue-router";

export type Role = "admin" | "user";

export interface UserState {
  isAuthenticated: boolean;
  userRoles: Role[];
}

export const mockUserState: UserState = {
  isAuthenticated: false,
  userRoles: ["user"],
};

type RouteMeta = {
  requiresAuth?: boolean;
  allowedRoles?: Role[];
};

export const isPublicRoute = (to: RouteLocationNormalized) => {
  const meta = to.meta as RouteMeta;

  return !meta.requiresAuth && (!meta.allowedRoles || meta.allowedRoles.length === 0);
};

export const isAllowedRole = (to: RouteLocationNormalized) => {
  const meta = to.meta as RouteMeta;

  if (!meta.allowedRoles || meta.allowedRoles.length === 0) {
    return true;
  }

  return meta.allowedRoles.some((role) =>
    mockUserState.userRoles.includes(role)
  );
};