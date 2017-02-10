const path = require('path');

module.exports = {
  entry: './src/js/scripts.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  // devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
        exclude: [/node_modules/],
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
}
