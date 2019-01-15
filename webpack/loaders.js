const cssModulesIdentNameDev = '[path][name]_[local]-[hash:base64:6]';
const cssModulesIdentNameProd = '[hash:base64:6]';

const path = require('path');
const dirname = path.resolve(__dirname, '../..');

const sourceMapMinimize = {
  sourceMap: true,
};


module.exports = {
  babelLoader: {
    loader: 'babel-loader',
    options: { cacheDirectory: './.webpack_cache/' },
  },

  babelLoaderNoCache: {
    loader: 'babel-loader',
  },

  styleLoader: 'style-loader',

  globalCssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 0,
      context: path.join(process.cwd(), './app'),
      modules: false,
      ...sourceMapMinimize,
    },
  },

  cssLoader: {
    loader: 'css-loader',
    options: {
      localIdentName: cssModulesIdentNameDev,
      modules: true,
      importLoaders: 1,
      context: path.join(process.cwd(), './app'),
      ...sourceMapMinimize,
    },
  },

  cssLoaderLocals: {
    loader: 'css-loader/locals',
    options: {
      modules: true,
      context: path.join(process.cwd(), './app'),
      importLoaders: 2,
      sourceMap: true,
      localIdentName: cssModulesIdentNameDev,
    },
  },

  postCssLoader: 'postcss-loader',

  sassLoader: {
    loader: 'sass-loader',
    options: { indentedSyntax: false },
  },

  sassVariablesLoader: {
    loader: '@epegzz/sass-vars-loader',
    options: {
      syntax: 'scss',
    },
  },

  resolveUrlLoader: {
    loader: 'resolve-url-loader',
    options: {
      root: dirname,
    },
  },


  svgLoader: {
    loader: 'react-svg-loader',
    options: {
      jsx: true,
      svgo: {
        plugins: [
          {
            cleanupIDs: {
              prefix: {
                toString() {
                  this.counter = (this.counter || 0) + 1;
                  return `svg-id-${this.counter}`;
                },
              },
            },
          },
        ],
      },
    },
  },
};
