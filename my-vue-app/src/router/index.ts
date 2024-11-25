import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import Login from "@/views/Login.vue";
import TaskList from "@/views/TaskList.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/tasks", name: "TaskList", component: TaskList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
