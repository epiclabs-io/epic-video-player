const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  entryPoint: path.resolve(__dirname, './src/index.ts'),
  bundle: path.resolve(__dirname, './dist/bundle'),
};

const dev = {
  mode: 'development',
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
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'evp',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
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
      inject: 'body',
      template: './index.html',
      filename: './index.html',
    }),
  ],
};

module.exports = dev;
