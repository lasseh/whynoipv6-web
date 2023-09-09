import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

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
    component: () => import("@/pages/DomainDetail.vue"),
    beforeEnter: (to, from, next) => {
      if (to.path.slice(-1) !== "/") {
        next(`${to.path}/`);
      } else {
        next();
      }
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/pages/Search.vue"),
    props: route => ({ query: route.query.q }),
  },
  // {
  //   path: "/metrics",
  //   component: () => import("./views/Metrics.vue"),
  // },
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
    beforeEnter: (to, from, next) => {
      if (to.path.slice(-1) !== "/") {
        next(`${to.path}/`);
      } else {
        next();
      }
    },
  },
  {
    path: "/changelog",
    name: "Changelog",
    component: () => import("@/pages/Changelog.vue"),
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
