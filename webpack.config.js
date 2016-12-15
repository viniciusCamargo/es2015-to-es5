module.exports = {
  // entry: './src/index.js',
  entry: {
    'index': './src/index.js',
    'about': './src/about.js'
  },
  output: {
    path: './public/js/',
    // filename: 'bundle.js',
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
