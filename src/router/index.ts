import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import PostView from "../views/PostView.vue";
import UserView from "../views/UserView.vue";
import StudentView from "../views/StudentView.vue";
import CssView from '../views/CssView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/post",
      name: "post",
      component: PostView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/students",
      name: "students",
      component: StudentView,
    },
    {
      path: "/css",
      name: "css",
      component: CssView,
    },
  ],
});

export default router;
