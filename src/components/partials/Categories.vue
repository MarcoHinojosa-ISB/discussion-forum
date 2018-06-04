<!-- view -->
<template>
  <table id="categories">
    <thead>
      <tr>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      <tr class="category-panel" v-for="c in categories">
        <td>
          <router-link :to="c.url">{{c.name}}</router-link>
          <p>{{c.description}}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- controller -->
<script>
  export default {
    name: "Categories",
    data: function(){
      return {
        categories: [
          {
            name: "Literature",
            url: "/cat/lit",
            description: "Discuss topics about literature"
          },
          {
            name: "Technology",
            url: "/cat/tech",
            description: "Discuss topics about technology"
          },
          {
            name: "Medicine",
            url: "/cat/med",
            description: "Discuss topics about medicine"
          },
          {
            name: "Politics",
            url: "/cat/pol",
            description: "Discuss topics about politics"
          },
          {
            name: "Sports",
            url: "/cat/sports",
            description: "Discuss topics about sports"
          },
          {
            name: "Art",
            url: "/cat/art",
            description: "Discuss topics about art"
          },
          {
            name: "Video Games",
            url: "/cat/vg",
            description: "Discuss topics about video games"
          },
          {
            name: "Television",
            url: "/cat/tv",
            description: "Discuss topics about tv shows"
          },
          {
            name: "Music",
            url: "/cat/music",
            description: "Discuss topics about music"
          },
          {
            name: "Nature",
            url: "/cat/nature",
            description: "Discuss topics about nature"
          }
        ]
      }
    },
    methods: {
      callApi: function(){
        Axios.get("/api/categories/retrieve-categories")
        .then(function(result){
          console.log(result);
        })
        .catch(function(err){
          console.log(err);
        })
      }
    }
  }
</script>
