const common = require("./webpack.common.js");
const glob = require("glob");
const merge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OpenBrowserPlugin = require("open-browser-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
    }),
    new OpenBrowserPlugin(
      `http://localhost:${process.env.npm_package_config_port}`
    ),
    new PurgecssPlugin({
      paths: () =>
        glob.sync(path.resolve(__dirname, "src") + "/**/*", { nodir: true })
    })
  ]
});
