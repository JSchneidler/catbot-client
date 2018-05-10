const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

// TODO: Maybe add HMR? Needs to be integrated with React, see https://github.com/gaearon/react-hot-loader

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    proxy: {'/api': `http://localhost:${process.env.API_PORT || 8888}`}
    //hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    /*
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    */
  ],
});