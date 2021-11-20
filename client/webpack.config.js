const path = require('path');

module.exports = {
  entry: './src/index.tsx', 
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    hashFunction: "xxhash64",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
    ],
  },
};
