const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dir = require('node-dir')

const pages = dir.subdirs('./pages', (err, paths) => {
  if (err) throw err

  return paths
}, 'dir', { sync: true, shortName: true, recursive: false })

const entries = pages.reduce((obj, entry) => {
  obj[entry] = `./pages/${entry}/js/index.js`

  return obj
}, {})

const htmlPages = pages.reduce((arr, page) => {
  const html = {
    template: `./pages/${page}/index.html`,
    chunks: [`${page}`],
    filename: `${page}.html`
  }

  return arr.concat(new HtmlWebpackPlugin(html))
}, [])

module.exports = {
  entry: entries,
  plugins: [...htmlPages],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: './build',
    port: 8888,
    open: true,
    openPage: '' // https://github.com/webpack/webpack-dev-server/issues/960#issuecomment-311477326
  }
}
