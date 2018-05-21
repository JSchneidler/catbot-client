// Include Node Modules Needed
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: [
    './app.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: { // This Is Where Files are Handled
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-react-loader'
      },
      {
        test: /\.(gif|png|jpe?g|webp)$/i,
        use: 'file-loader?hash=sha512&digest=hex&name=./images/[hash].[ext]'
      },
      {
        test: /\.(wav|mp3)$/i,
        use: 'file-loader?hash=sha512&digest=hex&name=./sounds/[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"],
    modules: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
    }),
  ],
};
