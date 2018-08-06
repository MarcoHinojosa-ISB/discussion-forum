<!-- view -->
<template>
  <div>
    <div id="post-create">
      <h2>Create a new post</h2>

      <div class="preview" v-if="preview">
        <pre v-html="textInput"></pre>
      </div>

      <form>
        <div class="style-buttons">
          <button type="button" v-bind:class="{active: bold}" v-on:click="styleText('bold')">Bold</button>
          <button type="button" v-bind:class="{active: italic}" v-on:click="styleText('italic')">Italic</button>
          <button type="button" v-bind:class="{active: underline}" v-on:click="styleText('underline')">Underline</button>
          <button type="button" v-bind:class="{active: spoiler}" v-on:click="styleText('spoiler')">Spoiler</button>
        </div>

        <textarea placeholder="Type something here" ref="post" class="post" v-model="textInput"></textarea>
        <button type="button" class="preview-btn" v-on:click="showPreview">Preview</button>
        <button type="submit" class="submit" v-on:click="handleSubmit">Post Message</button>
      </form>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Axios from "axios";

  export default {
    props: ['username', 'category', 'topicTitle','topicId', 'totalPosts', 'postsPerPage'],
    data(){
      return {
        textInput: "",
        preview: false,
        bold: false,
        italic: false,
        underline: false,
        spoiler: false
      }
    },
    methods: {
      // add html tags to message for style effects
      styleText: function(type){
        var textArea = this.$refs.post;
        var cursor = textArea.selectionStart;
        var tmpText= textArea.value;

        switch(type){
          case "bold":
            this.textInput = tmpText.substring(0, cursor) + (!this.bold ? "<b>" : "</b>") + tmpText.substring(cursor, tmpText.length);
            this.bold = !this.bold;
            break;
          case "italic":
            this.textInput = tmpText.substring(0, cursor) + (!this.italic ? "<i>" : "</i>") + tmpText.substring(cursor, tmpText.length);
            this.italic = !this.italic;
            break;
          case "underline":
            this.textInput = tmpText.substring(0, cursor) + (!this.underline ? "<u>" : "</u>") + tmpText.substring(cursor, tmpText.length);
            this.underline = !this.underline;
            break;
          case "spoiler":
            this.textInput = tmpText.substring(0, cursor) + (!this.spoiler ? "<span class='spoiler'>" : "</span>") + tmpText.substring(cursor, tmpText.length);
            this.spoiler = !this.spoiler;
            break;
        }
        this.$refs.post.focus();
      },
      showPreview: function(){
        this.preview = !this.preview;
      },
      handleSubmit: function(e){
        e.preventDefault();
        if(!this.textInput){
          return false;
        }

        var data = {
          message: this.textInput,
          username: this.username,
          topic_id: this.topicId
        }
        Axios.post("/api/topics/new-post", data)
        .then(result => {
          this.preview = false;
          this.textInput = "";

          var lastPageIndex = Math.ceil((this.totalPosts + 1) / this.postsPerPage);

          if(lastPageIndex-1 > 0)
            this.$router.push("/cat/"+this.category+"/"+this.topicId+"/"+this.topicTitle+"?page="+(lastPageIndex-1));
          else
            this.$router.push("/cat/"+this.category+"/"+this.topicId+"/"+this.topicTitle);

          this.$parent.updatePosts();
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
