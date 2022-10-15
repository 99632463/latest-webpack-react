const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = (env) => {
  const currentPath = path.join(__dirname, '../');
  const envPath = `${currentPath}.env.${env.ENVIRONMENT}`;
  const fileEnv = dotenv.config({ path: envPath }).parsed;

  const defineEnv = Object.keys(fileEnv).reduce((prev, key) => {
    prev[`process.env.${key}`] = JSON.stringify(fileEnv[key]);
    return prev;
  }, {});

  return {
    context: path.join(__dirname, "../src"),
    entry: {
      index: "index.tsx"
    },
    resolve: {
      modules: [path.join(__dirname, '../src'), 'node_modules'],
      alias: {
        '@common': path.join(__dirname, '../src/common'),
        '@business': path.join(__dirname, '../src/business'),
        '@container': path.join(__dirname, '../src/container'),
        '@components': path.join(__dirname, '../src/components'),
        '@store': path.join(__dirname, '../src/store'),
        '@http': path.join(__dirname, '../src/common/utils/http.ts')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.scss']
    },
    performance: { hints: false },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ["@babel/env", "@babel/react", "mobx"],
                plugins: ["@babel/transform-runtime"]
              }
            }
          ]
        },
        {
          test: /\.(ts|tsx)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        },
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(eot|svg|ttf|woff2?)/i,
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
            outputPath: 'fonts/',
            limit: 4 * 1024
          }
        },
        {
          test: /\.(jpg|jpeg|gif|bmp|svg|png)/i,
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
            outputPath: 'imgs/',
            limit: 4 * 1024
          }
        }
      ]
    },
    output: {
      filename: '[name].[chunkHash:4].js',
      chunkFilename: 'chunks/[name].[chunkHash:4].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        chunks: ['index'],
        template: 'index.html',
        filename: 'index.html'
      }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.join(__dirname, '../tsconfig.json')
      }),
      new AddAssetHtmlWebpackPlugin({
        filepath: require.resolve('../dist/dll/vendor.dll.js'),
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../dist/dll/vendor-manifest.json')
      }),
      new webpack.DefinePlugin(defineEnv),
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}