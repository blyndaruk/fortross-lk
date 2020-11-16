import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import MyAccount from "@/views/MyAccount.vue";
import PortfolioCompanies from '@/views/PortfolioCompanies';
import Documents from '@/views/Documents';

const routes = [
  {
    path: "/",
    name: "Главная",
    component: Home,
  },
  {
    path: "/my-account",
    name: "Мой счет",
    component: MyAccount,
  },
  {
    path: "/portfolio-companies",
    name: "Портфельные компании",
    component: PortfolioCompanies,
  },
  {
    path: "/documents",
    name: "Документы",
    component: Documents,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
