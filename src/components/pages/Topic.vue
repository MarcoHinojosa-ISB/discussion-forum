<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="topic">
      <h3>{{topicTitle}}</h3>
      <ul class="breadcrumbs">
        <li><router-link to="/">Home &#9656;</router-link></li>
        <li><router-link :to="'/cat/' + category">{{category.toUpperCase()[0] + category.slice(1)}} &#9656;</router-link></li>
        <li><span>{{topicTitle}}</span></li>
      </ul>
      <div class="post" v-for="p in posts">
        <div class="header">
          <span class="username">{{p.username}}</span>
          <span class="date">{{transformDate(p.date_created)}}</span>
        </div>
        <div class="message">
          <pre>{{p.message}}</pre>
        </div>
      </div>
      <router-link :to="'/cat/' + category + '/' + topicId + '/' + topicTitle + '/new-post'" class="new-post-btn">New post</router-link>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import Axios from "axios";
  import Moment from "moment";

  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        topicId: this.$route.params.topic_id,
        topicTitle: this.$route.params.topic_title,
        category: this.$route.params.category,
        posts: []
      }
    },
    beforeMount: function(){
      Axios.get("/api/topics/retrieve-posts?topic_id="+this.$route.params.topic_id)
      .then(result => {
        console.log(result.data.rows)
        this.posts = result.data.rows;
      })
      .catch(err => {
        console.log(err);
      })
    },
    methods: {
      transformDate: function(d){
        return Moment(new Date(d), 'MM-DD-YYYY').format('MM/DD/YYYY');
      }
    }
  }
</script>
