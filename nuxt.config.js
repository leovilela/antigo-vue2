const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});


const {
  axios,
  build,
  css,
  generate,
  modules,
  plugins,
  render,
  router,
  head,
  i18n,
  styleResources,
} = require("./src/config");

const env = require("./env");

module.exports = {
  ssr: false,
  mode: "spa",
  srcDir: "src/",
  env,
  modules,
  axios,
  head,
  loading: false,
  render,
  router,
  plugins,
  css,
  build,
  generate,
  i18n,
  styleResources,
};
