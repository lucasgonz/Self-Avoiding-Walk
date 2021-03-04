const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";
let target = "web";
const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./public/view/index.html",
  }),
];

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode: mode,
  entry: "./src/index.js",

  output: {
    // output path is required for `clean-webpack-plugin`
    path: path.resolve(__dirname, "dist"),
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: plugins,
  target: target,
  devtool: "source-map",

  resolve: {
    extensions: [".js"],
  },

  // required if using webpack-dev-server
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8080,
    hot: true,
  },
};
