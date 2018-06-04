<!-- view -->
<template>
  <div id="login">
    <form>
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
    </form>
  </div>
</template>

<!-- controller -->
<script>
  export default {
    data: function(){
      return {
        username: "",
        password: ""
      }
    }
  }
</script>
