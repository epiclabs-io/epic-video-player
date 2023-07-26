const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  entryPoint: path.resolve(__dirname, './src/index.ts'),
  bundle: path.resolve(__dirname, './dist/bundle'),
};

const prod = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 812000,
    maxAssetSize: 812000,
  },
  target: 'web',
  entry: {
    evp: [PATHS.entryPoint],
  },
  output: {
    path: PATHS.bundle,
    filename: 'index.min.js',
    libraryTarget: 'umd',
    library: 'evp',
    umdNamedDefine: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './index.html',
      filename: './index.html',
    }),
  ],
};

module.exports = prod;
