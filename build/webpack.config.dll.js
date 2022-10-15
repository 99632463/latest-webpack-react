const path = require('path');
const webpack = require('webpack');
const library = '[name]_lib';

module.exports = {
  context: path.join(__dirname, '../dist'),
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'mobx',
      'mobx-react',
    ]
  },
  output: {
    filename: 'dll/[name].dll.js',
    library
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/dll/[name]-manifest.json'),
      name: library
    })
  ]
}