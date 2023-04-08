const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: ["regenerator-runtime/runtime.js",`${SRC_DIR}/index.jsx`],
  module: {
    rules: [
      {
        test: /\.(js||jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      filename: 'bundle.js',
      publicPath: '/',
      path: `${DIST_DIR}`,
    },
    devtool: "source-map"
  };

