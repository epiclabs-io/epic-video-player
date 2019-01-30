const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  entryPoint: path.resolve(__dirname, './src/index.ts'),
  bundle: path.resolve(__dirname, './dist')
};

const dev = {
  mode: 'development',
  target: 'web',
  entry: {
    'evp': [PATHS.entryPoint]
  },
  output: {
    path: PATHS.bundle,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'evp',
    umdNamedDefine: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: false
        },
        sourceMap: true
      })
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
      }
    ]
  }
};

const prod = {
  mode: 'production',
  target: 'web',
  entry: {
    'evp': [PATHS.entryPoint]
  },
  output: {
    path: PATHS.bundle,
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'evp',
    umdNamedDefine: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
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
      }
    ]
  }
};

module.exports = [dev, prod];
