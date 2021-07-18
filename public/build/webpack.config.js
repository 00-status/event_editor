'use-strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { test: /\.tsx?$/, exclude: '/node_modules/', use: 'ts-loader' }
    ]
  },
};
