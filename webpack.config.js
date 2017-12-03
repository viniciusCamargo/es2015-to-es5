const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob')

const pages = glob.sync('./pages/*').map(i => i.replace('./pages/', ''))

const js = glob.sync('./pages/*/js/index.js')
  .reduce((entries, path, i) => {
    const page = pages[i]
    entries[page] = path

    return entries
  }, {})


const html = pages.reduce((arr, page) => {
  const html = {
    template: `./pages/${page}/index.html`,
    chunks: [`${page}`],
    filename: `${page}.html`
  }

  return arr.concat(new HtmlWebpackPlugin(html))
}, [])

const rules = [
  { test: /\.js$/, exclude: /node_modules/, use: {
    loader: 'babel-loader',
    options: { presets: ['es2015'] }
  } },
  { test: /\.css$/, use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: { loader: 'css-loader', options: { minimize: true } }
  }) },
  { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
  { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
]

module.exports = {
  entry: { ...js },
  module: { rules },
  plugins: [
    ...html,
    new ExtractTextPlugin('css/[name].css')
  ],
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
