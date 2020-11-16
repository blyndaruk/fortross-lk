import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from "@/views/Home.vue";
import MyAccount from "@/views/MyAccount.vue";
import PortfolioCompanies from '@/views/PortfolioCompanies';
import Documents from '@/views/Documents';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/my-account",
    name: "my-account",
    component: MyAccount,
  },
  {
    path: "/portfolio-companies",
    name: "portfolio-companies",
    component: PortfolioCompanies,
  },
  {
    path: "/documents",
    name: "documents",
    component: Documents,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
