const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      overrideConfig: {
        env: {
          node: true,
          browser: true,
          es6: true,
        },
        parserOptions: {
          ecmaVersion: 2015,
          sourceType: "module",
        },
      },
    }),
  ],
  externals: {
    jquery: "$",
    underscore: "_",
  },
  devtool: "source-map",
};
