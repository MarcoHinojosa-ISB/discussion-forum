<!-- View -->
<template>
  <div>
    <App-Header />

    <div id="home">
      <h2>Choose a Category</h2>
      <Categories />
    </div>
  </div>
</template>

<!-- Controller -->
<script>
  import Header from "../partials/Header.vue";
  import Categories from "../partials/Categories.vue";

  export default {
    components: {
      "App-Header": Header,
      "Categories": Categories
    },
    data: function(){
      return {
        message: "Home page"
      }
    }
  }
</script>
