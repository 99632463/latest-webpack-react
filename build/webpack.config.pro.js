const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => merge(baseConfig(env), {
  
})