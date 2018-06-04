<!-- view -->
<template>
  <div id="header">
    <h1 v-on:click="redirectToHome">DF</h1>
    <ul>
      <li v-for="l in links">
        <router-link :to="l.url">{{l.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<!-- controller -->
<script>
  export default {
    data: function(){
      return {
        links: [
          {name: "Login", url: "/"},
          {name: "Register", url: "/register"}
        ]
      }
    },
    methods: {
      redirectToHome: function(){
        this.$router.push({ path: '/' });
      }
    }
  }
</script>
