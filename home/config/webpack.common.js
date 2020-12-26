const paths = require('./paths');
const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;


module.exports = {
  
  // cache: false,
  // Where webpack looks to start building the bundle
  // Откуда начинается сборка
  entry: [paths.src + '/main.js'],

  target: "web",

  // Where webpack outputs the assets and bundles
  // Куда помещаются файлы сборки
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    // publicPath: './',
    publicPath: "auto",
  },

  // Customize the webpack build process
  // Настройки
  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3501/remoteEntry.js",
      },
      exposes: {
        "./Content": "./src/components/Content",
        // "./Button": "./src/components/Button",
      },
    }),

    new VueLoaderPlugin(),
    // Removes/cleans build folders and unused assets when rebuilding
    // Удаление/очистка директории для файлов сборки и неиспользуемых ресурсов при повтроном сборке
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    // Копирование статических файлов
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Создание HTML-файла на основе шаблона
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      // template file
      // шаблон
      template: paths.public + '/index.html', // paths.src + '/template.html',
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  // Настройка модулей
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      // JavaScript: использовать Babel для транспиляции
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },

      // Styles: Inject CSS into the head with source maps
      // Стили: встроить CSS в head с картами источников
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      // Изображения: копировать файлы в директорию для файлов сборки
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      // Шрифты и SVG
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },

  // resolve: {
  //   extensions: [".vue", ".jsx", ".js", ".json"],
  //   alias: {
  //     // this isn't technically needed, since the default `vue` entry for bundlers
  //     // is a simple `export * from '@vue/runtime-dom`. However having this
  //     // extra re-export somehow causes webpack to always invalidate the module
  //     // on the first HMR update and causes the page to reload.
  //     vue: "@vue/runtime-dom",
  //   },
  // },  
}
