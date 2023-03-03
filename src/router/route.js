import VueRouter from "vue-router";

import MainPage from "../pages/MainPage.vue";
import PostsPage from "../pages/PostsPage.vue";
import UserPage from "../pages/UserPage.vue";
import PostPage from "../pages/PostPage.vue";
import ErrorPage from "../pages/NotFound";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/posts",
      name: "PostsPage",
      component: PostsPage,
    },
    {
      path: "/user",
      name: "UserPage",
      component: UserPage,
    },
    {
      path: "/post/:id",
      name: "PostPage",
      component: PostPage,
    },
    {
      path: "*",
      name: "ErrorPage",
      component: ErrorPage,
    },
  ],
});
