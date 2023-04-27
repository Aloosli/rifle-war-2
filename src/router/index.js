import { createRouter, createWebHistory } from "vue-router";
import FactionList from "../views/FactionList.vue";
import TargetList from "../views/TargetList.vue";
import LoginPage from "../views/LoginPage.vue";
import Dashboard from "../views/DashBoard.vue";


const routes = [
  {
    path: "/",
    redirect: "/faction-list",
  },
  {
    path: "/faction-list",
    name: "FactionList",
    component: FactionList,
  },
  {
    path: "/target-list",
    name: "TargetList",
    component: TargetList,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

