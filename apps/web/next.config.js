const withTM = require("next-transpile-modules")(["ui"]);
const webpack = require('webpack')

const { parsed: dotEnv } = require('dotenv').config({
  path:'../../.env'
})

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    // compile files from 'operations' package / grapqhql-codegen
    externalDir: true, 
  },

  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(dotEnv))
    return config
  } 
});
