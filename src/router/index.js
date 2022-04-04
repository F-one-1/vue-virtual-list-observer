import { createRouter, createWebHashHistory } from "vue-router"

// const home = () => import("../home.vue")

const routes = [
  // {
  //   path: "/home",
  //   name: "home",
  //   component: home
  // },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})