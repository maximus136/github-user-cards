var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'GitHubCard': [
      'webpack-dev-server/client?http://localhost:8881/',
      'webpack/hot/only-dev-server',
      './main/GitHubCard.jsx'
    ]
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    publicPath: 'http://localhost:8881/main/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6', '.scss'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
       test: /\.jsx$|\.es6$|\.js$/,
       loaders: ['react-hot', 'babel-loader'],
       exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', // backup loader when not building .css file
          'css!sass' // loaders to preprocess CSS
        )
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css!postcss!css-loader'
        })
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'iOS 7']
    })
  ],
  plugins: [
    new ExtractTextPlugin("./styles.css"),
    new webpack.NoErrorsPlugin()
  ],
  devtool: "eval-source-map",
  hot: true
};