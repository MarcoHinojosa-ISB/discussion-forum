<!-- View -->
<template>
  <div id="home">
    <Categories />
  </div>
</template>

<!-- Controller -->
<script>
  import Categories from "../partials/Categories.vue";

  export default {
    components: {
      "Categories": Categories
    },
    data: function(){
      return {
        message: "Home page"
      }
    }
  }
</script>
