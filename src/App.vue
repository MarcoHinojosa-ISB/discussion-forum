<!-- view -->
<template>
  <div id="app">
    <App-Header />

    <router-view />
  </div>
</template>

<!-- controller -->
<script>
  import Header from "./components/partials/Header.vue";

  export default {
    name: "App",
    components: { "App-Header": Header },
    data: function(){
      return {
        message: "test"
      }
    }
  }
</script>
