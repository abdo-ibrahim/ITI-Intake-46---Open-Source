import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
// import { isAllowedRole, isPublicRoute, mockUserState } from "./routingLogic";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductsView from "../views/ProductsView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false,
      allowedRoles: [],
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      requiresAuth: false,
      allowedRoles: [],
    },
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: {
      requiresAuth: false,
      allowedRoles: [],
    },
  },
  {
    path: "/products/:id(\\d+)",
    name: "ProductDetails",
    component: () => import("../views/ProductDetailsView.vue"),
    props: true,
    meta: {
      requiresAuth: false,
      allowedRoles: [],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, _from, next) => {
//   if (isPublicRoute(to)) {
//     next();
//   } else if (mockUserState.isAuthenticated && isAllowedRole(to)) {
//     next();
//   } else {
//     next({ name: "home" });
//   }
// });

export default router;
