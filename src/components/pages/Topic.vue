<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="topic">
      <h3>{{topicTitle}}</h3>

      <ul class="breadcrumbs">
        <li><router-link :to="'/'">Home &#9656;</router-link></li>
        <li><router-link :to="'/cat/' + category">{{category.toUpperCase()[0] + category.slice(1)}} &#9656;</router-link></li>
        <li><span>Topic</span></li>
      </ul>

      <!-- posts -->
      <div class="posts" >
        <div v-for="(p, index) in currentPosts">
          <Post :postData="p" :index="index"/>
        </div>
      </div>

      <!-- pagination -->
      <div v-if="pages.length > 1" class="pagination">
        <button v-if="notFirst()" v-on:click="loadPage(0)"><<</button>
        <button v-if="third()" v-on:click="loadPage(currentPageIndex-1)"><</button>
        <span>Page {{currentPageIndex + 1}} of {{pages.length}}</span>
        <button v-if="thirdToLast()" v-on:click="loadPage(currentPageIndex+1)">></button>
        <button v-if="notLast()" v-on:click="loadPage(pages.length-1)">>></button>
      </div>

      <!-- create post -->
      <div v-if="username">
        <Post-Create
          :username="username"
          :category="category"
          :topicTitle="topicTitle"
          :topicId="topicId"
          :totalPosts="allPosts.length"
          :postsPerPage="postsPerPage" />
      </div>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import Post from "../partials/Post.vue";
  import PostCreate from "../partials/PostCreate.vue";
  import Axios from "axios";
  import store from "../../store/index.js";
  import jwt from "jsonwebtoken";
  import jwtsecret from "../../../jwtsecret.js";

  export default {
    components: {
      "App-Header": Header,
      "Post": Post,
      "Post-Create": PostCreate
    },
    data: function(){
      return {
        topicId: this.$route.params.topic_id,
        topicTitle: this.$route.params.topic_title,
        category: this.$route.params.category,
        username: "",
        pages: [],
        currentPageIndex: 0,
        postsPerPage: 10,
        allPosts: [],
        currentPosts: []
      }
    },
    created: function(){
      this.updatePosts();

      try{
        var userdata = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
        this.username = userdata.username;
      }
      catch(err){}
    },
    methods: {
      notFirst: function(){
        return this.currentPageIndex !== 0;
      },
      third: function(){
        return this.currentPageIndex > 1;
      },
      thirdToLast: function(){
        return this.currentPageIndex < this.pages.length-2;
      },
      notLast: function(){
        return this.currentPageIndex !== this.pages.length-1;
      },
      loadPage: function(newIndex){
        this.currentPageIndex = newIndex;
        this.currentPosts = this.allPosts.slice(this.currentPageIndex * this.postsPerPage, (this.currentPageIndex * this.postsPerPage) + this.postsPerPage);

        if(this.currentPageIndex > 0)
          this.$router.push("/cat/"+this.category+"/"+this.topicId+"/"+this.topicTitle+"?page="+this.currentPageIndex);
        else
          this.$router.push("/cat/"+this.category+"/"+this.topicId+"/"+this.topicTitle);
      },
      updatePosts: function(){
        Axios.get("/api/posts/retrieve-posts?topic_id="+this.$route.params.topic_id)
        .then(result => {
          // get all pages
          this.allPosts = result.data.rows;

          // if not first page of topic, update current page index
          if(this.$route.query.page)
            this.currentPageIndex = parseInt(this.$route.query.page);

          // show a chunk of posts based on current page index
          this.currentPosts = this.allPosts.slice(this.currentPageIndex * this.postsPerPage, (this.currentPageIndex * this.postsPerPage) + this.postsPerPage);

          // show number of pages
          this.pages = [];
          for(var i=1, p=0; p<this.allPosts.length; i++, p+=this.postsPerPage){
            this.pages.push(i);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
