const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')



module.exports = merge(common, {
  // Set the mode to development or production
  // Установка режима разработки или продакшна
  mode: 'development',

  // // Control how source maps are generated
  // // Управление созданием карт источников
  // devtool: 'inline-source-map',

  devtool: "source-map",
  optimization: {
    minimize: false,
  },

  // Spin up a server for quick development
  // Запуск сервера для разработки
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 3500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },

  plugins: [
    // Only update what has changed on hot reload
    // Обновлять только при "горячей" перезагрузке
    new webpack.HotModuleReplacementPlugin(),
  ],
})
