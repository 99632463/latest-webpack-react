const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = (env) => merge(baseConfig(env), {
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    overlay: true,
    port: 8888
  }
});