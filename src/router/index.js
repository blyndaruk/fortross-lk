import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import MyAccount from "@/views/MyAccount.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/my-account",
    name: "My account",
    component: MyAccount,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
