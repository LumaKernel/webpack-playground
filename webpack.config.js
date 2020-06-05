const path = require('path');
const unassertTransformer = require('typescript-plugin-unassert');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'eval-source-map',
  entry: {
    main: './src/scripts/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src/scripts')],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [...(isProduction ? [unassertTransformer] : [])],
              }),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.mjs', '.js', 'jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/scripts'),
    },
  },
};
