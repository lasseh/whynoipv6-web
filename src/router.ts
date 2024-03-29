import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

// Ensure trailing slash
// TODO: Fix this properly
const ensureTrailingSlash = (to: any, from: any, next: any) => {
  if (to.path.slice(-1) !== "/") {
    next(`${to.path}/`);
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/domain",
    component: () => import("@/pages/DomainList.vue"),
  },
  {
    path: "/domain/:domain",
    name: "DomainDetail",
    beforeEnter: ensureTrailingSlash,
    component: () => import("@/pages/DomainDetail.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/pages/Search.vue"),
    props: route => ({ query: route.query.q }),
  },
  {
    path: "/metrics",
    component: () => import("@/pages/Metrics.vue"),
  },
  {
    path: "/country",
    name: "CountryList",
    component: () => import("@/pages/CountryList.vue"),
  },
  {
    path: "/country/:id",
    name: "CountryDetail",
    component: () => import("@/pages/CountryDetail.vue"),
  },
  {
    path: "/campaign",
    name: "CampaignList",
    component: () => import("@/pages/CampaignList.vue"),
  },
  {
    path: "/campaign/:uuid",
    name: "CampaignDetail",
    component: () => import("@/pages/CampaignDetail.vue"),
  },
  {
    path: "/campaign/:uuid/:domain",
    name: "CampaignDomainDetail",
    component: () => import("@/pages/CampaignDomain.vue"),
    beforeEnter: ensureTrailingSlash,
  },
  {
    path: "/changelog",
    name: "Changelog",
    component: () => import("@/pages/Changelog.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("@/pages/FAQ.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/pages/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
