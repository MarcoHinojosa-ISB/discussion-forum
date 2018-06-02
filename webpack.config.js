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
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  entry: ["./src/entry.js"],
  output: {
    path: __dirname + "/src/build",
    publicPath: "/src/build",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
}
