module.exports = {
  /*
   ** Run ESLint on save
   */
  extend(config, {
    isClient,
    isDev,
  }) {
    if (process.env.NODE_ENV === "development" && isClient) {
      config.module.rules.push({
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/,
      });
      config.devtool = "source-map";
    }
  },
};
