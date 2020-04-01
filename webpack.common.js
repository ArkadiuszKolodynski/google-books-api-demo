const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "@babel/polyfill",
    "url-polyfill",
    "whatwg-fetch",
    path.resolve(__dirname, "src", "main.js")
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "images" }
          }
        ]
      }
    ]
  },
  output: {
    filename: "js/[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Google Books API Demo",
      template: path.resolve(__dirname, "src", "templates", "index.ejs")
    })
  ]
};
