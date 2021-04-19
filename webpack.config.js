const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    open: true
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'url-loader',
          options: {
            generator: (content) => svgToMiniDataURI(content.toString())
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Components: path.resolve(__dirname, 'src/components'),
      Helpers: path.resolve(__dirname, 'src/helpers'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Src: path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HENNGE Challenge',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src/assets/favicon.png')
    }),
    new CleanWebpackPlugin()
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
  }

  return config
}
