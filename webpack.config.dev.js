const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  entryPoint: path.resolve(__dirname, './src/index.ts'),
  bundle: path.resolve(__dirname, './dist/bundle')
};

const dev = {
  mode: 'development',
  performance: {
    hints: false,
    maxEntrypointSize: 812000,
    maxAssetSize: 812000
  },
  target: 'web',
  entry: {
    'evp': [PATHS.entryPoint]
  },
  output: {
    path: PATHS.bundle,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'evp',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 5,
          mangle: false,
        },
        sourceMap: true,
      }),
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(png|woff|woff2|eot|ttf|svg)$/
      },
      {
        loader: 'style-loader!css-loader',
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html',
      filename: './index.html',
    }),
  ]
};

module.exports = dev;

