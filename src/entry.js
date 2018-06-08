// =====routing logic
import Vue from "vue";
import vueRouter from "vue-router";
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";
import TopicList from "./components/pages/TopicList.vue";
import TopicCreate from "./components/pages/TopicCreate.vue";
import Topic from "./components/pages/Topic.vue";
import PostCreate from "./components/pages/PostCreate.vue";

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
      path: "/cat/:category",
      name: "TopicList",
      component: TopicList
    },
    {
      path: "/cat/:category/create",
      name: "TopicCreate",
      component: TopicCreate
    },
    {
      path: "/cat/:category/:topic_id/:topic_title",
      name: "Topic",
      component: Topic
    },
    {
      path: "/cat/:category/:topic_id/:topic_title/new-post",
      name: "PostCreate",
      component: PostCreate
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
