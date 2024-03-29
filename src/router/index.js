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
  base: process.env.NODE_ENV === 'production'
        ? '/lk/'
        : '/',
  routes,
  scrollBehavior () {
    return {
      x: 0, y: 0,
      // behavior: 'smooth',
    }
  }
});

export default router;
