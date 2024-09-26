import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../modules/home/pages/index.vue"),
  },
  {
    path: "/lots-calculator",
    name: "Lots calculator",
    component: () => import("../modules/lots-calculator/pages/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
