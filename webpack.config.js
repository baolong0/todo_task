const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  // entry is where, say, your app starts - it can be called main.ts, index.ts, app.ts, whatever
  entry: "./src/apps/index.ts",
  // This forces webpack not to compile TypeScript for one time, but to stay running, watch for file changes in project directory and re-compile if needed
  watch: false,
  // Is needed to have in compiled output imports Node.JS can understand. Quick search gives you more info
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    alias: {
      "Viewobjects": path.resolve(__dirname, "src", "views"),
      "Gateways": path.resolve(__dirname, "src", "domain", "gateways"),
      "Models": path.resolve(__dirname, "src", "domain", "models"),
      "Repositories": path.resolve(__dirname, "src", "domain", "repositories"),
      "Errors": path.resolve(__dirname, "src", "errors"),
      "Injection": path.resolve(__dirname, "src", "injection"),
      "Usecases": path.resolve(__dirname, "src", "usecases"),
      "Utils": path.resolve(__dirname, "src", "utils"),
      "Common": path.resolve(__dirname, "src", "common"),
      "Configs": path.resolve(__dirname, "src", "configs"),
      "Apps": path.resolve(__dirname, "src", "apps"),
      "Sql": path.resolve(__dirname, "src", "sql"),
      "Tests": path.resolve(__dirname, "src", "tests"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
};