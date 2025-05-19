const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    builds: './public/js/builds.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ],
  },
  devtool: 'inline-source-map',
};