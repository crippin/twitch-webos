const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const sourcePath = path.join(__dirname, 'src');

const config = {
  entry: ['babel-polyfill', path.resolve(sourcePath, 'App.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [sourcePath, path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: sourcePath,
      },
    ],
  },
  plugins: [],
  /**
   * webpack 4
   */
   optimization: {
     minimizer: [new UglifyJsPlugin()],
   },
  mode: 'production',
  performance: {
    maxEntrypointSize: 2120000,
    maxAssetSize: 2120000,
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  config.plugins.push(new webpack.HashedModuleIdsPlugin());
  config.plugins.push(
    new UglifyJsPlugin()
  );
}

module.exports = config;
