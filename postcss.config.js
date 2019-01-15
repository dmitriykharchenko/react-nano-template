const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const cssnano = require('cssnano');
const postcssnested = require('postcss-nested');
const flexboxFixes = require('postcss-flexbugs-fixes');

const postcss = {
  plugins:
  [
    postcssFocus(),
    postcssnested(),
    cssnext(),
    postcssReporter({
      clearMessages: true,
    }),
    flexboxFixes,
  ],
};

if (process.env.NODE_ENV === 'production') {
  postcss.plugins.push(cssnano({ zindex: false }));
}

module.exports = postcss;
