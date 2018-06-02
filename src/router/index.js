import Vue from "vue";
import vueRouter from "vue-router";
import Home from "../components/Home.vue";

Vue.use(vueRouter);

export default new vueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});
