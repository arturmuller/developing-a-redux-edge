const path = require('path');

const entry = [ './source/index' ];

const output = {
  path: path.resolve(__dirname, 'public/js'),
  filename: 'app.js',
};

const resolve = {
  extensions: [ '', '.js', '.jsx' ],
};

const scriptLoader = {
  loader: 'babel',
  include: path.resolve(__dirname, 'source'),
  test: /\.jsx$|\.js$/,
};

module.exports = {
  devtool: 'eval',
  entry,
  output,
  resolve,
  module: { loaders: [ scriptLoader ] },
};
