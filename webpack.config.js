const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[main][contenthash].js',
  },
  module: {
      rules: [
        {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
            ],
        }
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};

