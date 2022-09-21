const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  context: path.resolve('./example'),
  entry: './main.ts',
  output: {
    filename: 'example.bundle.js',
    path: buildPath,
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 5000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: { inline: 'no-fallback' },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(vs|fs|glsl|vert|frag)$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
