const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const CaseSensitivePathPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');

const dirname = path.resolve(__dirname, '../');
const loaders = require('./loaders');


const defineVariables = {
  ENV: JSON.stringify(process.env.NODE_ENV),
};

const env = process.env.NODE_ENV || 'development';

module.exports = [
  {
    devtool: env === 'development' ? 'eval' : false,
    mode: env,

    entry: {
      app: ['babel-polyfill', './initializers/client.js'],
    },

    target: 'web',

    output: {
      path: path.resolve(dirname, 'public'),
      filename: '[name].js',
      publicPath: '/public',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve(dirname), 'node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, loaders.globalCssLoader, loaders.postCssLoader, loaders.sassLoader, loaders.sassVariablesLoader],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, loaders.cssLoader, loaders.postCssLoader, loaders.sassLoader, loaders.sassVariablesLoader],
        },
        {
          test: /\.js*$/,
          exclude: /node_modules/,
          use: [loaders.babelLoader],
        },
        {
          test: /\/fonts\/.*\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: 'url-loader',
            query: {
              name: 'fonts/[name].[hash].[ext]',
              limit: '8192',
            },
          },
        },
        {
          test: /\.svg$/,
          exclude: [/node_modules/],
          use: [loaders.babelLoader, loaders.svgLoader],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          CLIENT: JSON.stringify(true),
          ...defineVariables,
        },
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      new webpack.NamedModulesPlugin(),
      new CaseSensitivePathPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  }, {
    devtool: false,
    mode: env,

    entry: {
      server: ['babel-polyfill', './initializers/server.js'],
    },

    target: 'node',
    externals: [nodeExternals()],

    output: {
      path: path.resolve(dirname, 'public'),
      filename: '[name].js',
      publicPath: '/public',
      libraryTarget: 'commonjs2',
    },

    node: {
      __filename: true,
      __dirname: true,
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve(dirname), 'node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.css/,
          exclude: /node_modules/,
          use: [loaders.cssLoaderLocals, loaders.postCssLoader, loaders.sassLoader, loaders.sassVariablesLoader],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [loaders.cssLoaderLocals, loaders.postCssLoader, loaders.sassLoader, loaders.sassVariablesLoader],
        },
        {
          test: /\.js*$/,
          exclude: /node_modules/,
          use: [loaders.babelLoader],
        },
        {
          test: /\/fonts\/.*\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: 'url-loader',
            query: {
              name: 'fonts/[name].[hash].[ext]',
              limit: '8192',
            },
          },
        },
        {
          test: /\.svg$/,
          exclude: [/node_modules/],
          use: [loaders.babelLoader, loaders.svgLoader],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          CLIENT: JSON.stringify(false),
          ...defineVariables,
        },
      }),

      new webpack.NamedModulesPlugin(),
      new CaseSensitivePathPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  }
];
