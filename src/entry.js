// =====routing logic
import Vue from "vue";
import vueRouter from "vue-router";
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";

Vue.use(vueRouter);

var router = new vueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
// =================

import App from "./App.vue";

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App />"
});
