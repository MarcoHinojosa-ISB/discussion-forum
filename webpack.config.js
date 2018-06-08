var bodyParser = require("body-parser");

//get api routes
var auth = require("./backend/api/auth.js");
var topics = require("./backend/api/topics.js");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            js: "babel-loader"
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/
      }
    ]
  },
  // resolve to use vue's runtime + compiler build to render components
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  entry: ["./src/entry.js", "./src/stylesheets/_main.scss"],
  output: {
    path: __dirname + "/src/build",
    publicPath: "/src/build",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    setup: function(app){
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));

      app.use(function (req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, authorization");//, multipart/form-data");
        next();
      })

      //connect api routes
      app.use("/api/auth", auth.routes);
      app.use("/api/topics", topics.routes);
    }
  }
}
