const { defineConfig } = require("@vue/cli-service");
const Dotenv = require("dotenv-webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.BASE_URL,
  configureWebpack: {
    plugins: [new Dotenv()],
  },
  devServer: {
    client: {
      overlay: false,
    },
  },
});
